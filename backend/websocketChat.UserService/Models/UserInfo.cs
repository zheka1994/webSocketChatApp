using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.UserService.Models
{
    public class UserInfo
    {
        public UserDto User { get; set; }
        public List<Friend> Friends { get; set; }
        public List<Chat> Chats { get; set; }
    }
}
