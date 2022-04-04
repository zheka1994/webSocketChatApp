using System;
using Microsoft.EntityFrameworkCore;
using websocketChat.Data.Models;

namespace websocketChat.Data
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {
            
        }
        
        public DbSet<User> Users { get; set; }
    }
}