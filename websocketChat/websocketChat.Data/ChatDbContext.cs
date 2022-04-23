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

        public async Task SaveChangesAsync()
        {
            await base.SaveChangesAsync();
        }
    }
}