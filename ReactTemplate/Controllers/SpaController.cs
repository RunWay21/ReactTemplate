using System.Web.Mvc;

namespace ReactTemplate.Controllers
{
    public class SpaController : Controller
    {
        public ActionResult Index()
        {
            return View("Spa");
        }
    }
}
