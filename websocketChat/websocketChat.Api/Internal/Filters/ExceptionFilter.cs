using System.Net;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using websocketChat.Core.Exceptions;

namespace websocketChat.Api.Internal.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;

            if (exception is ExceptionBase)
            {
                var exBase = exception as ExceptionBase;
                context.Result = new ContentResult
                {
                    Content = JsonConvert.SerializeObject(new
                    {
                        exBase.Message, exBase.Code
                    })
                };
                context.HttpContext.Response.ContentType = MediaTypeNames.Application.Json;
                context.HttpContext.Response.StatusCode = (int) HttpStatusCode.BadRequest;
            }
        }
    }
}