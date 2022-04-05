namespace websocketChat.UserService.Models.Enums
{
    /// <summary>
    /// Тип авторизации
    /// </summary>
    public enum AuthType : byte
    {
        /// <summary>
        /// JWT-токен
        /// </summary>
        Jwt = 1,
        
        /// <summary>
        /// Google почта
        /// </summary>
        Google = 2,
        
        /// <summary>
        /// Телеграмм
        /// </summary>
        Telegram = 3
    }
}