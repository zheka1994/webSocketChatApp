using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace websocketChat.Data.Models
{
    /// <summary>
    /// Список участников группы
    /// </summary>
    public class Party
    {
        public int ID { get; set; }
        public int ChatID { get; set; }
        public int UserID { get; set; }
        public Chat Chat { get; set; }
        public User User { get; set; }
    }
}
