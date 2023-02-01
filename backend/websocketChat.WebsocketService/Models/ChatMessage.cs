using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.WebsocketService.Models
{
    [Serializable]
    public class ChatMessage : MessageBase
    {
        public int IdChat { get; set; }
        public List<Receiver> Receivers { get; set; }
    }
}
