using System.Threading.Tasks;
using websocketChat.UserService.Models;

namespace websocketChat.UserService
{
    public interface IUserService
    {
        public Task<AuthResponse> Authorize(AuthRequest request);
        public Task<RegisterResponse> Register(RegisterRequest request);
    }
}