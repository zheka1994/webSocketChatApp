namespace websocketChat.UserService.Models
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}