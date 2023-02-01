using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.WebsocketService.Models;

namespace websocketChat.WebsocketService
{
    public interface IWebSocketService
    {
        Task ListenChannel(UserIdentity user, WebSocket socket);
    }
}
