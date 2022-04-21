using websocketChat.UserService.Models.Enums;

namespace websocketChat.UserService.Models
{
    public class OAuthRequest
    {
        public string Code { get; set; }
        public string RedirectUri { get; set; }
        public AuthType Type { get; set; }
    }
}