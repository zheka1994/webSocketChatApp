using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.WebsocketService.Models
{
    public class WebsocketConnection
    {
        private readonly Guid _id;
        private readonly WebSocket _webSocket;

        public WebSocket Socket
        {
            get
            {
                return _webSocket;
            }
        }

        public Guid Id
        {
            get
            {
                return _id;
            }
        }

        public WebsocketConnection(WebSocket webSocket)
        {
            _webSocket = webSocket;
            _id = Guid.NewGuid();
        }
    }
}
