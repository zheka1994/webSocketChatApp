using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.WebsocketService.Models
{
    public class WebsocketConnection : IEquatable<WebsocketConnection>
    {
        private readonly Guid _id;
        private readonly WebSocket _webSocket;

        public WebsocketConnection(WebSocket webSocket)
        {
            _webSocket = webSocket;
            _id = Guid.NewGuid();
        }

        public Guid Id
        {
            get
            {
                return _id;
            }
        }

        public bool Equals(WebsocketConnection other)
        {
            return Id == other.Id;
        }
    }
}
