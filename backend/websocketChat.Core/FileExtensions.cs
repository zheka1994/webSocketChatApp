using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Core
{
    public class FileExtensions
    {
        public static string GetMimeTypeByFileName(string fileName)
        {
            var extension = GetFileExtension(fileName);

            if (string.IsNullOrEmpty(extension))
            {
                throw new Exception("Не указано расширение файла");
            }
            return GetMimeType(GetFileExtension(fileName));
        }

        private static string GetFileExtension(string fileName)
        {
            var parts = fileName?.Trim().Split(".");
            if (parts == null || parts.Length < 1)
            {
                return string.Empty;
            }
            return parts[1];
        }

        public static string GetMimeType(string extension)
        {
            switch (extension)
            {
                case "json":
                    return "application/json";
                case "js":
                    return "application/javascript";
                case "pdf":
                    return "application/pdf";
                case "mp4":
                    return "audio/mp4";
                case "mpeg":
                    return "audio/mpeg";
                case "gif":
                    return "image/gif";
                case "jpg":
                case "jpeg":
                    return "image/jpeg";
                case "png":
                    return "image/png";
                case "svg":
                    return "image/svg+xml";
                case "webp":
                    return "image/webp";
                default:
                    throw new Exception("Неизвестный mime тип");
            }
        }
    }
}
