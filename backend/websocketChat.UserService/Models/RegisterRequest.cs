using System.ComponentModel.DataAnnotations;

namespace websocketChat.UserService.Models
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Не указано имя пользователя")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Не указан пароль")]
        public string Password { get; set; }
        [EmailAddress(ErrorMessage = "Не указан адрес электронной почты")]
        public string Email { get; set; }
        [Phone(ErrorMessage = "Не указан номер телефона")]
        public string PhoneNumber { get; set; }
    }
}