using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.WebsocketService.Models
{
    [Serializable]
    public abstract class MessageBase
    {
        public string Type { get; set; }
        public string Message { get; set; }
    }
}
