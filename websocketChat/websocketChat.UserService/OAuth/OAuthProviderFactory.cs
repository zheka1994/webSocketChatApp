using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models.Enums;

namespace websocketChat.UserService.OAuth
{
    public class OAuthProviderFactory
    {
        public IOAuthProvider GetAuthProvider(AuthType type, OAuthOptions options, IRepository repository)
        {
            switch (type)
            {
                case AuthType.Vk:
                    return new VkOAuthProvider.VkOAuthProvider(options.VkAuthOptions, repository);
                default:
                    throw new UserServiceException($"Неверный тип поставщика авторизации {type}");
            }
        }
    }
}