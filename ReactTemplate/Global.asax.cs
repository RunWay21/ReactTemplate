using System.Globalization;
using System.Threading;
using System.Web.Mvc;
using System.Web.Routing;

namespace ReactTemplate
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            CultureInfo.DefaultThreadCurrentCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo.DefaultThreadCurrentUICulture = Thread.CurrentThread.CurrentUICulture;

            AreaRegistration.RegisterAllAreas();
            Startup.MvcRegisterRoutes(RouteTable.Routes);
        }
    }
}
