using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string AvatarUri { get; set; }
        public ICollection<Chat> Chats { get; set; }
        public ICollection<Message> Messages { get; set; }
        public ICollection<MessageStatus> MessageStatuses { get; set; }
        public ICollection<Party> Parties { get; set; }
    }
}