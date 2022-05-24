using System.Collections.Generic;
using System.Threading.Tasks;
using websocketChat.UserService.Models;

namespace websocketChat.UserService
{
    public interface IUserService
    {
        public Task<AuthResponse> Authorize(AuthRequest request);
        public Task<RegisterResponse> Register(RegisterRequest request);
        public Task<AuthResponse> OAuthorize(OAuthRequest request);
        public Task<UserInfo> GetUserInfo(string name, string phoneNumber);
        public Task<List<UserDto>> FindFriends(string query);
    }
}