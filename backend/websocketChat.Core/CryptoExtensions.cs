using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace websocketChat.Core
{
    /// <summary>
    /// Хедпер для криптографии
    /// </summary>
    public class CryptoExtensions
    {
        /// <summary>
        ///  Сгенерировать соль
        /// </summary>
        /// <param name="length">Длина соли</param>
        /// <returns></returns>
        public static string GenerateSalt(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        
        /// <summary>
        /// Создать хеш из источника
        /// </summary>
        /// <param name="source">Источник</param>
        /// <param name="salt">Соль</param>
        /// <returns></returns>
        public static string CreateHash(string source, string salt)
        {
            using SHA256 sha256Hash = SHA256.Create();
            string hash = GetHash(sha256Hash, source, salt);
            return hash;
        }
        
        /// <summary>
        /// Вычислить хеш
        /// </summary>
        /// <param name="hashAlgorithm"></param>
        /// <param name="source"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        private static string GetHash(HashAlgorithm hashAlgorithm, string source, string salt)
        {
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(source + salt));
            var sBuilder = new StringBuilder();
            
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            
            return sBuilder.ToString();
        }
        
        /// <summary>
        /// Проверить хеш
        /// </summary>
        /// <param name="hashAlgorithm">Хеш-алгоритм</param>
        /// <param name="source">Источник</param>
        /// <param name="hash">Хеш</param>
        /// <param name="salt">Соль</param>
        /// <returns></returns>
        private static bool VerifyHash(HashAlgorithm hashAlgorithm, string source, string hash, string salt)
        {
            var hashOfInput = GetHash(hashAlgorithm, source, salt);
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;
            return comparer.Compare(hashOfInput, hash) == 0;
        }
    }
}