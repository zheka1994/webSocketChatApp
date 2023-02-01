using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace websocketChat.Api.Controllers.Internal
{
    public class ControllerBase : Controller
    {
        public HttpAuthUser GetAuthUser()
        {
            var claimsDictionary = User.Claims;
            return new HttpAuthUser
            {
                Name = User.Claims.SingleOrDefault(u => u.Type == "name")?.Value,
                PhoneNumber = User.Claims.SingleOrDefault(u => u.Type == "phone")?.Value
            };
        }
    }
}
