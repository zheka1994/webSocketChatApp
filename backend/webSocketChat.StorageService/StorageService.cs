using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using websocketChat.Core.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.IO;

namespace webSocketChat.StorageService
{
    public class StorageService : IStorageService
    {
        private readonly StorageOptions _storageOptions;
        public StorageService(IOptions<StorageOptions> storageOptions)
        {
            _storageOptions = storageOptions?.Value;
        }

        public async Task<string> UploadFile(IFormFile formFile)
        {
            if (formFile?.Length == 0)
            {
                throw new Exception("Необходимо загрузить файл");
            }
            var fileName = ContentDispositionHeaderValue.Parse(formFile.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(_storageOptions?.StorageUrl, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }
            return fileName;
        }


        public Stream DownloadFile(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                throw new Exception("Не задано имя файла");
            }

            var fullPath = Path.Combine(_storageOptions?.StorageUrl, fileName);

            if (!File.Exists(fullPath))
            {
                throw new Exception("Файл не существует");
            }

            FileStream stream = File.OpenRead(fullPath);
            return stream;
        }
    }
}
