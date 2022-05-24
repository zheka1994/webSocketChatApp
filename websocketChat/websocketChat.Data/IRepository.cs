using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using websocketChat.Data.Models;

namespace websocketChat.Data
{
    public interface IRepository : IDisposable
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageStatus> MessageStatuses { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public Task SaveChangesAsync();
    }
}