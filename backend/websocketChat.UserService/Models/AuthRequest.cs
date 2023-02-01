using System.ComponentModel.DataAnnotations;

namespace websocketChat.UserService.Models
{
    public class AuthRequest
    {
        [Required(ErrorMessage = "Не указано имя пользователя")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Не указан пароль")]
        public string Password { get; set; }
    }
}