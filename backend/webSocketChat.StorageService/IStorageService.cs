using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace webSocketChat.StorageService
{
    public interface IStorageService
    {
        public Task<string> UploadFile(IFormFile formFile);
        public Stream DownloadFile (string path);
    }
}
