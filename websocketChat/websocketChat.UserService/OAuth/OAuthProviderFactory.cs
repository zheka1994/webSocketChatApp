using websocketChat.Core.Models;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models.Enums;

namespace websocketChat.UserService.OAuth
{
    public class OAuthProviderFactory
    {
        public IOAuthProvider GetAuthProvider(AuthType type, OAuthOptions options)
        {
            switch (type)
            {
                case AuthType.Vk:
                    return new VkOAuthProvider.VkOAuthProvider(options.VkAuthOptions);
                default:
                    throw new UserServiceException($"Неверный тип поставщика авторизации {type}");
            }
        }
    }
}