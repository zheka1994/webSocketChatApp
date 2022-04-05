using Microsoft.Extensions.DependencyInjection;
using websocketChat.Data;
using websocketChat.UserService;

namespace websocketChat.Api.Internal
{
    public static class ServicesConfiguration
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddTransient<IRepository, ChatDbContext>();
            services.AddScoped<IUserService, UserService.UserService>();
        }
    }
}