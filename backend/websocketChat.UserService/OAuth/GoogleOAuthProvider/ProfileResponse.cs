using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace websocketChat.UserService.OAuth.GoogleOAuthProvider
{
    public class ProfileResponse
    {
        [JsonPropertyName("name")]
        public string FullName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}