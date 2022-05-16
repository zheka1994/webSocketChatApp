using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using websocketChat.Core;
using websocketChat.Core.Authorization;
using websocketChat.WebsocketService;

namespace websocketChat.Api.Controllers
{
    [ApiController]
    public class WebsocketController : ControllerBase
    {
        private readonly IWebSocketService _webSocketService;

        public WebsocketController(IWebSocketService webSocketService)
        {
            _webSocketService = webSocketService;
        }

        [HttpGet("/ws")]
        public async Task Get([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                HttpContext.Response.StatusCode = 401;
                return;
            }

            var claims = JwtTokenExtensions.GetClaimsByToken(token);

            var name = claims.GetValueOrDefault("name");
            var phone = claims.GetValueOrDefault("phone");
            var email = claims.GetValueOrDefault("email");

            if (claims.Count == 0
                || name == null
                || phone == null
                || email == null)
            {
                HttpContext.Response.StatusCode = 401;
                return;
            }

            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _webSocketService.AddConnection(webSocket, new UserIdentity
                {
                    Name = name.Value,
                    PhoneNumber = phone.Value,
                    Email = email.Value
                });
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}
