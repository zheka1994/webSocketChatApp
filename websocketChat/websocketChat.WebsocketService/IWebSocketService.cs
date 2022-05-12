using System;
using System.Net.WebSockets;
using websocketChat.Core.Authorization;

namespace websocketChat.WebsocketService
{
    public interface IWebSocketService
    {
        void AddConnection(WebSocket webSocket, UserIdentity userIdentity);
    }
}
