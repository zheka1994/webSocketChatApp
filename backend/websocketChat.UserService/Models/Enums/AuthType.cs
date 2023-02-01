namespace websocketChat.UserService.Models.Enums
{
    /// <summary>
    /// Тип авторизации
    /// </summary>
    public enum AuthType : byte
    {
        /// <summary>
        /// Google почта
        /// </summary>
        Google = 1,
        
        /// <summary>
        /// Телеграмм
        /// </summary>
        Telegram = 2,
        
        /// <summary>
        /// Вконтакте
        /// </summary>
        Vk = 3
    }
}