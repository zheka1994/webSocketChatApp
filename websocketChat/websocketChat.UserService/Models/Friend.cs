using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.UserService.Models
{
    public class Friend : UserDto
    {
        public byte Status { get; set; }
    }
}
