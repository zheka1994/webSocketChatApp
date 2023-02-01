using System.Text.Json.Serialization;

namespace websocketChat.UserService.OAuth.VkOAuthProvider
{
    public class AccessTokenError
    {
        [JsonPropertyName("error")]
        public string Error { get; set; }
        
        [JsonPropertyName("error_description")]
        public string ErrorDescription { get; set; }
    }
}