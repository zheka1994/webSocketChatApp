using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using websocketChat.UserService;
using websocketChat.UserService.Models;

namespace websocketChat.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.Register(request);
            return Ok(result);
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Authorize([FromBody] AuthRequest request)
        {
            var result = await _userService.Authorize(request);
            return Ok(result);
        }
    }
}