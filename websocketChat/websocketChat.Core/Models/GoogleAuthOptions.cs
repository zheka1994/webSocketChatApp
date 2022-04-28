using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Core.Models
{
    public class GoogleAuthOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ApiSecret { get; set; }
        public string TokenEndpoint { get; set; }
        public string MethodsBaseEndpoint { get; set; }
    }
}
