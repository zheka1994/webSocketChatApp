using System;
using System.Text.Json.Serialization;

namespace webSocketChat.Services.StaticService.Models
{
    [Serializable]
    public class App {
        [JsonPropertyName("app")]
        public Assets Assets { get;set; }
    }
}