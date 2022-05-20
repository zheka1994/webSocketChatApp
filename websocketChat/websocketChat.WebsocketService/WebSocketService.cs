using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.Data;
using websocketChat.WebsocketService.Models;

namespace websocketChat.WebsocketService
{
    public class WebSocketService : IWebSocketService, IDisposable
    {
        private readonly ISubscriber _subscriber;
        private readonly IServiceScope _scope;
        private readonly WebSocketConnectionsHandler _connectionHandler;
        private const string _userChannel = "userChannel";
        private const string _chatChannel = "chatChannel";
        public WebSocketService(IServiceProvider services, IConnectionMultiplexer connectionMultiplexer)
        {
            _scope = services.CreateScope();
            _subscriber = connectionMultiplexer.GetSubscriber();
            _connectionHandler = new WebSocketConnectionsHandler();

            _subscriber.Subscribe(_userChannel, async (channel, message) =>
            {
                    var userMessage = System.Text.Json.JsonSerializer.Deserialize<UserMessage>(message);
                    if (userMessage.Receiver == null)
                    {
                        throw new Exception("Пришел пустой отправитель");
                    }

                    var connection = _connectionHandler.GetConnectionByUser(new Core.Authorization.UserIdentity
                    {
                        Name = userMessage.Receiver.Name,
                        Email = userMessage.Receiver.Email,
                        PhoneNumber = userMessage.Receiver.PhoneNumber
                    });

                    if (connection != null && connection.Socket.State != WebSocketState.Closed)
                    {
                        await SendStringAsync(connection.Socket, message);
                    }
            });

            _subscriber.Subscribe(_chatChannel, async (channel, message) => {
                var userMessage = System.Text.Json.JsonSerializer.Deserialize<ChatMessage>(message);
                if (userMessage.Receivers == null || !userMessage.Receivers.Any())
                {
                    throw new Exception("Некому отправлять сообщения");
                }

                foreach (var receiver in userMessage.Receivers)
                {
                    var connection = _connectionHandler.GetConnectionByUser(new Core.Authorization.UserIdentity
                    {
                        Name = receiver.Name,
                        Email = receiver.Email,
                        PhoneNumber = receiver.PhoneNumber
                    });

                    if (connection != null && connection.Socket.State != WebSocketState.Closed)
                    {
                        await SendStringAsync(connection.Socket, message);
                    }
                }
            });
        }

        private Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default)
        {
            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);
            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        private async Task SendToUser(Receiver receiver, string message)
        {
            using (var repository = _scope.ServiceProvider.GetRequiredService<IRepository>())
            {
                var user = await repository.Users.SingleOrDefaultAsync(u => u.Name == receiver.Name
                 && u.PhoneNumber == receiver.PhoneNumber
                 && u.Email == receiver.Email);

                if (user == null)
                {
                    throw new Exception("Такого пользователя не существует");
                }

                MessageBase channelMessage = new UserMessage
                {
                    Type = "userMessage",
                    Receiver = new Receiver
                    {
                        Name = user.Name,
                        PhoneNumber = user.PhoneNumber,
                        Email = user.Email
                    },
                    Message = message
                };
                var channelMessageSerialized = JsonConvert.SerializeObject(channelMessage);
                await _subscriber.PublishAsync(_userChannel, channelMessageSerialized);
            }
        }


        private async Task SendToChat(int idChat, string message, List<Receiver> receivers = null)
        {
            using (var repository = _scope.ServiceProvider.GetRequiredService<IRepository>())
            {
                var chat = await repository.Chats
                .Include(c => c.Parties)
                    .ThenInclude(p => p.User)
                .SingleOrDefaultAsync(c => c.ID == idChat);

                if (chat == null)
                {
                    throw new Exception("Такого чата не существует");
                }

                // отбираем только нудных получателей
                if (receivers == null)
                {
                    receivers = chat.Parties?.Select(p => new Receiver
                    {
                        Name = p?.User?.Name,
                        PhoneNumber = p?.User?.PhoneNumber,
                        Email = p?.User?.Email
                    }).ToList();
                }
                else
                {
                    receivers.Where(r => chat.Parties.Any(p => p.User.Name == r.Name && p.User.PhoneNumber == r.PhoneNumber && p.User.Email == r.Email));
                }

                MessageBase channelMessage = new ChatMessage
                {
                    Receivers = receivers,
                    Message = message
                };
                var channelMessageSerialized = System.Text.Json.JsonSerializer.Serialize(channelMessage);
                await _subscriber.PublishAsync(_chatChannel, channelMessageSerialized);
            } 
        }

        public void Dispose()
        {
            _scope?.Dispose();
        }

        public async Task ListenChannel(UserIdentity user, WebSocket socket)
        {
            _connectionHandler.AddConnection(socket, user);
            WebSocketReceiveResult result;
            //Сообщение от клиента
            while (true)
            {

                var buffer = new byte[1024 * 4];
                result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.CloseStatus.HasValue)
                {
                    break;
                }
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    var msgText = Encoding.UTF8.GetString(buffer);
                    var msgType = GetMessageType(msgText);

                    if (string.IsNullOrEmpty(msgType))
                    {
                        continue;
                    }

                    if (msgType == "userMessage")
                    {
                        var userMessage = JsonConvert.DeserializeObject<UserMessage>(msgText);
                        await SendToUser(userMessage.Receiver, userMessage.Message);
                    }
                    else if (msgType == "chatMessage")
                    {
                        var chatMessage = JsonConvert.DeserializeObject<ChatMessage>(msgText);
                        await SendToChat(chatMessage.IdChat, chatMessage.Message, chatMessage.Receivers);
                    }
                }
            }
            _connectionHandler.RemoveConnection(user);

            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, result.CloseStatusDescription, CancellationToken.None);
            socket.Dispose();
        }
        
        private string GetMessageType(string msgText)
        {
            int startIndex = msgText.IndexOf("type");
            if (startIndex != -1)
            {
                int endIndex = msgText.Substring(startIndex).IndexOf(",");
                string msgType = msgText.Substring(startIndex, endIndex)?.Split(":")[1]?.Trim('\"');
                return msgType;
            }
            return string.Empty;
        }
    }
}
