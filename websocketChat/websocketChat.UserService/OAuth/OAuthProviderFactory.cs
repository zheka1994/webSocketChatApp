using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models.Enums;

namespace websocketChat.UserService.OAuth
{
    public class OAuthProviderFactory
    {
        public IOAuthProvider GetAuthProvider(AuthType type, OAuthOptions oAuthOptions, IRepository repository, JwtOptions jwtOptions)
        {
            switch (type)
            {
                case AuthType.Vk:
                    return new VkOAuthProvider.VkOAuthProvider(oAuthOptions.VkAuthOptions, repository, jwtOptions);
                case AuthType.Google:
                    return new GoogleOAuthProvider.GoogleOAuthProvider();
                default:
                    throw new UserServiceException($"Неверный тип поставщика авторизации {type}");
            }
        }
    }
}