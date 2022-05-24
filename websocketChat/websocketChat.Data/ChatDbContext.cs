using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using websocketChat.Data.Models;

namespace websocketChat.Data
{
    public class ChatDbContext : DbContext, IRepository
    {
        // For migrations
        public ChatDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=chat-db;Username=chat-api;Password=qwerty123");
        }

        // For service
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {
            
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageStatus> MessageStatuses { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<Friend> Friends { get; set; }

        public async Task SaveChangesAsync()
        {
            await base.SaveChangesAsync();
        }
    }
}