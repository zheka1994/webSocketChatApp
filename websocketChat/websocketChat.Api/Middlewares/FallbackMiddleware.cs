using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace websocketChat.Api.Middlewares
{
    public class FallbackMiddleware
    {
        private readonly List<string> _spaRoutes = new()
        {
            "/chat",
            "/oauth-redirect"
        };
        
        private readonly RequestDelegate _next;

        public FallbackMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path;

            if (_spaRoutes.Contains(path))
            {
                context.Request.Path = new PathString("/");
            }
            
            await _next(context);
        }
    }
}