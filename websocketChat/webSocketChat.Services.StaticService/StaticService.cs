using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using webSocketChat.Services.StaticService.Models;
using Microsoft.AspNetCore.Hosting;
using System;

namespace webSocketChat.Services.StaticService
{
    public class StaticService: IStaticService
    {
        private Assets _assets;
        private readonly IWebHostEnvironment _env;

        public StaticService(IWebHostEnvironment env) {
            _env = env;
        }

        public async Task<Assets> ReadAssetsAsync() {
            if (_assets == null)
            {
                var filePath = Path.Combine(_env.WebRootPath, "dist", "assets.json");

                byte[] result;

                await using (FileStream sourceStream = File.Open(filePath, FileMode.Open)) {
                    result = new byte[sourceStream.Length];
                    await sourceStream.ReadAsync(result.AsMemory(0, (int)sourceStream.Length));
                }
                var stringResult = System.Text.Encoding.ASCII.GetString(result);
                var app = await Task.FromResult<App>(JsonSerializer.Deserialize<App>(stringResult));
                _assets = app?.Assets;
            }
            return _assets;
        }
    }
}