using System;
using System.Web;
using System.Web.Mvc;

namespace ReactTemplate.Infrastructure.Extensions
{
    public static class UrlHelperExtensions
    {
        public static string ContentVersioned(this UrlHelper self, string contentPath)
        {
            if (string.IsNullOrEmpty(contentPath))
                throw new ArgumentNullException(nameof(contentPath));
            var filename = HttpContext.Current.Server.MapPath(contentPath);
            var fileInfo = new System.IO.FileInfo(filename);
            var versionedContentPath = contentPath + "?v=" + fileInfo.LastWriteTime.ToString("yyMMddHHmmss");
            return self.Content(versionedContentPath);
        }
    }
}