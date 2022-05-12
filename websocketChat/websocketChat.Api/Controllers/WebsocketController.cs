using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.WebsocketService;

namespace websocketChat.Api.Controllers
{
    [Route("")]
    [ApiController]
    [Authorize]
    public class WebsocketController : ControllerBase
    {
        private readonly IWebSocketService _webSocketService;

        public WebsocketController(IWebSocketService webSocketService)
        {
            _webSocketService = webSocketService;
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var user = HttpContext.User;
                _webSocketService.AddConnection(webSocket, new UserIdentity
                {
                    //Name = user.Identity
                });
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}
