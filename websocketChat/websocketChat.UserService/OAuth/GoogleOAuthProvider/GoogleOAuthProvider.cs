using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using websocketChat.UserService.Models;

namespace websocketChat.UserService.OAuth.GoogleOAuthProvider
{
    public class GoogleOAuthProvider : IOAuthProvider
    {
        public Task<AuthResponse> Authorize(OAuthRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
