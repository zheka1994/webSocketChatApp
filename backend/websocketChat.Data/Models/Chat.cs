using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Data.Models
{
    public class Chat
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        
        public User User { get; set; }
        public ICollection<Message> Messages { get; set; }
        public ICollection<Party> Parties { get; set; }
    }
}
