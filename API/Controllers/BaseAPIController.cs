using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseAPIController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
