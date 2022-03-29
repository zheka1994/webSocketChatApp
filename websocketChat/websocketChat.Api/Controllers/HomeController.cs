using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace websocketChat.Api.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}