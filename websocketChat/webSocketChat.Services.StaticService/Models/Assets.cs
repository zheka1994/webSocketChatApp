using System;
using System.Text.Json.Serialization;

namespace webSocketChat.Services.StaticService.Models
{
    [Serializable]
    public class Assets {
        [JsonPropertyName("css")]
        public string CssUrl { get; set; }
        [JsonPropertyName("js")]
        public string JsUrl { get; set; }
    }
}