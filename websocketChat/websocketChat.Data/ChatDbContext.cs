using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using websocketChat.Data.Models;

namespace websocketChat.Data
{
    public class ChatDbContext : DbContext, IRepository
    {
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