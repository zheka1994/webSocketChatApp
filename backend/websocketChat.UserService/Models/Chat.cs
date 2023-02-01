using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.UserService.Models
{
    public class Chat
    {
        public UserDto Creator { get; set; }
        public string Name { get; set; }
        public List<Message> Messages { get; set; }
        public List<UserDto> Parties { get; set; }
    }
}
