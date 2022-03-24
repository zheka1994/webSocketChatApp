using System;
using System.Threading.Tasks;
using webSocketChat.Services.StaticService.Models;

namespace webSocketChat.Services.StaticService
{
    public interface IStaticService
    {
        Task<Assets> ReadAssetsAsync();
    }
}