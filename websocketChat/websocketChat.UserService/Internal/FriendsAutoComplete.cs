using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using websocketChat.Data;
using websocketChat.Data.Models;
using websocketChat.UserService.Models;
using websocketChat.UserService.Models.Mapper;

namespace websocketChat.UserService.Internal
{
    public class FriendsAutoComplete
    {
        private readonly IRepository _repository;
        public FriendsAutoComplete(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<UserDto>> GetUserSuggestions(string query)
        {
            var getByNameTaskRes = await GetByName(query);
            var getByEmailTaskRes = await GetByEmail(query);
            var getByPhoneTaskRes = await GetByPhone(query);
            var results = getByNameTaskRes.Union(getByEmailTaskRes).Union(getByPhoneTaskRes);
            return results.Select(r => r.TransformToDto()).ToList();
        }

        private async Task<List<User>> GetByName(string query)
        {
            var result = await _repository.Users
                .Where(u => u.Name.StartsWith(query))
                .ToListAsync();
            return result;
        }

        private async Task<List<User>> GetByEmail(string query)
        {
            var result = await _repository.Users
                .Where(u => u.Email.StartsWith(query))
                .ToListAsync();
            return result;
        }

        private async Task<List<User>> GetByPhone(string query)
        {
            var result = await _repository.Users
                .Where(u => u.PhoneNumber.StartsWith(query))
                .ToListAsync();
            return result;
        }
    }
}
