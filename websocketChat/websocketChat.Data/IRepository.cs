using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using websocketChat.Data.Models;

namespace websocketChat.Data
{
    public interface IRepository
    {
        public DbSet<User> Users { get; set; }
        public Task SaveChangesAsync();
    }
}