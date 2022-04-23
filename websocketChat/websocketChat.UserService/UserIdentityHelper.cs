using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.Data.Models;

namespace websocketChat.UserService
{
    public class UserIdentityHelper
    {
        private UserIdentity GetUserIdentityFromUser(User user)
        {
            return new UserIdentity
            {
                Email = user.Email,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber
            };
        }
    }
}
