namespace websocketChat.Core.Models
{
    public class VkAuthOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string TokenEndpoint { get; set; }
        public string ApiVkEndpoint { get; set; }
    }
}