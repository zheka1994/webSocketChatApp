namespace websocketChat.Data.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string PwdHash { get; set; }
        public string PwdSalt { get; set; }
    }
}