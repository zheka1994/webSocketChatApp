using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Data.Models
{
    public class Friend
    {
        public int ID { get; set; }
        public int FriendOneId { get; set; }
        public int FriendTwoId { get; set; }
        public byte Status { get; set; }
    }
}
