using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.WebsocketService.Models
{
    [Serializable]
    public class UserMessage : MessageBase
    {
        public Receiver Receiver { get; set; } 
    }
}
