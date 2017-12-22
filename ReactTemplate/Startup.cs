using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using LightInject;
using Microsoft.Owin;
using Newtonsoft.Json.Serialization;
using Owin;
using Services;

[assembly: OwinStartup(typeof(ReactTemplate.Startup))]
namespace ReactTemplate
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            ConfigureContainer(config);
            ConfigureWebApi(app, config);
        }

        private void ConfigureContainer(HttpConfiguration config)
        {
            var container = new ServiceContainer();
            container.RegisterApiControllers();
            container.EnableWebApi(config);
            container.Register<IBookService, BookService>(new PerRequestLifeTime());
        }

        public void ConfigureWebApi(IAppBuilder app, HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            //disable XML
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
            //enable camelCase for Json
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            app.UseWebApi(config);
        }

        public static void MvcRegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                "Spa",
                "{section}/{*parameters}",
                new { controller = "Spa", action = "Index" },
                new { section = "(app|admin|client|common)" });


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Spa", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}