using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.WebsocketService.Models;

namespace websocketChat.WebsocketService
{
    public class WebSocketConnectionsHandler
    {
        private readonly ConcurrentDictionary<UserIdentity, WebsocketConnection> _connections;

        public WebSocketConnectionsHandler()
        {
            _connections = new ConcurrentDictionary<UserIdentity, WebsocketConnection>();
        }

        public void AddConnection(WebSocket webSocket, UserIdentity userIdentity)
        {
            _connections.TryAdd(userIdentity, new WebsocketConnection(webSocket));
        }

        public void RemoveConnection(UserIdentity userIdentity)
        {
            _connections.TryRemove(userIdentity, out var _);
        }

        public WebsocketConnection GetConnectionByUser(UserIdentity userIdentity)
        {
            var isConnectionOnThisServer = _connections.TryGetValue(userIdentity, out var connection);

            if (!isConnectionOnThisServer)
            {
                return null;
            }
            return connection;
        }
    }
}
