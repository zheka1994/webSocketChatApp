using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.UserService.Models
{
    public class Message
    {
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public UserDto User { get; set; }
    }
}
