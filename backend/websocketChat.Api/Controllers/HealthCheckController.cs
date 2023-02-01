
using Microsoft.AspNetCore.Mvc;

namespace websocketChat.Api.Controllers {
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HealthCheckController : ControllerBase {
        [HttpGet]
        public IActionResult HealthCheck() {
            return Ok("Api is working");
        }
    }
}