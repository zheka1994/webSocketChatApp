using System.Threading.Tasks;
using websocketChat.UserService.Models;

namespace websocketChat.UserService.OAuth
{
    public interface IOAuthProvider
    {
        public Task<AuthResponse> Authorize(OAuthRequest request);
    }
}