using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.WebsocketService.Models;

namespace websocketChat.WebsocketService
{
    public class WebSocketService : IWebSocketService
    {
        private readonly Dictionary<WebsocketConnection, UserIdentity> _connections;

        public WebSocketService()
        {
            _connections = new Dictionary<WebsocketConnection, UserIdentity>();
        }

        public void AddConnection(WebSocket webSocket, UserIdentity userIdentity)
        {
            _connections.Add(new WebsocketConnection(webSocket), userIdentity);
        }

        public UserIdentity GetUserIdentityByConnection(WebsocketConnection connection)
        {
            return _connections.GetValueOrDefault(connection);
        }
    }
}
