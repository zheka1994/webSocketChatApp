using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using websocketChat.Api.ViewModels;
using webSocketChat.Services.StaticService;

namespace websocketChat.Api.Controllers
{
    public class HomeController : Controller
    {
        private readonly IStaticService _staticService;

        public HomeController(IStaticService staticService) {
            _staticService = staticService;
        }
        public async Task<IActionResult> Index()
        {
            var assets = await _staticService.ReadAssetsAsync();
            var model = new HomeViewModel
            {
                CssFileName = assets.CssUrl,
                JsFileName = assets.JsUrl
            };
            return View(model);
        }
    }
}