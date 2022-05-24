using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using websocketChat.UserService;
using websocketChat.UserService.Models;
using websocketChat.UserService.Models.Enums;

namespace websocketChat.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : Internal.ControllerBase
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
        public async Task<IActionResult> Auth([FromBody] AuthRequest request)
        {
            var result = await _userService.Authorize(request);
            return Ok(result);
        }

        [HttpPost("oauth")]
        public async Task<IActionResult> OAuth([FromBody] OAuthRequest request)
        {
            var result = await _userService.OAuthorize(request);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("info")]
        public async Task<IActionResult> GetUserInfo()
        {
            var user = GetAuthUser();
            var result = await _userService.GetUserInfo(user.Name, user.PhoneNumber);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("friends/new")]
        public async Task<IActionResult> FindFriends([FromQuery] string q)
        {
            var friends = await _userService.FindFriends(q);
            return Ok(friends);
        }
    }
}