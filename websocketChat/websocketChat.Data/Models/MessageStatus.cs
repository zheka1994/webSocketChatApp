using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Data.Models
{
    /// <summary>
    /// Статусы сообщений
    /// </summary>
    public class MessageStatus
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int MessageID { get; set; }
        public int Status { get; set; }
    }
}
