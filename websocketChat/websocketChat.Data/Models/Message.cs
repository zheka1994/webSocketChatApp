using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Data.Models
{
    /// <summary>
    /// Сообщения
    /// </summary>
    public class Message
    {
        public int ID { get; set; }
        public int ChatID { get; set; }
        public int UserID { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
