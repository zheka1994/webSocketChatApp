using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using websocketChat.Data.Models;

namespace websocketChat.UserService.Models.Mapper
{
    public static class Mapper
    {
        public static UserDto TransformToDto(this User user)
        {
            return new UserDto
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                AvatarUri = user.AvatarUri
            };
        }
    }
}
