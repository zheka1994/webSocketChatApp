using Microsoft.Extensions.DependencyInjection;
using websocketChat.Data;
using websocketChat.UserService;
using websocketChat.WebsocketService;
using webSocketChat.StorageService;

namespace websocketChat.Api.Internal
{
    public static class ServicesConfiguration
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddTransient<IRepository, ChatDbContext>();
            services.AddScoped<IUserService, UserService.UserService>();
            services.AddSingleton<IWebSocketService, WebsocketService.WebSocketService>();
            services.AddScoped<IStorageService, StorageService>();
        }
    }
}