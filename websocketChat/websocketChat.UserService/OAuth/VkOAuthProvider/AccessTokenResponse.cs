using System;
using System.Text.Json.Serialization;

namespace websocketChat.UserService.OAuth.VkOAuthProvider
{
    public class AccessTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
        
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        
        [JsonPropertyName("user_id")]
        public int UserId { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}