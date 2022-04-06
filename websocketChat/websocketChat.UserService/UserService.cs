using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using websocketChat.Core;
using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.Data.Models;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models;

namespace websocketChat.UserService
{
    public class UserService : IUserService
    {
        private readonly IRepository _repository;
        private readonly IOptions<UserServiceOptions> _options;
        private const int SaltLength = 8;

        public UserService(IRepository repository, IOptions<UserServiceOptions> options)
        {
            _repository = repository;
            _options = options;
        }

        public async Task<AuthResponse> Authorize(AuthRequest request)
        {
            var user = await _repository.Users.SingleOrDefaultAsync(u => u.Name == request.Name);
            if (user == null)
            {
                throw new UserServiceException("Пользователя с таким именем не существует. Пройдите регистрацию.");
            }
            
            if (!IsPasswordCorrect(user, request.Password))
            {
                throw new UnauthorizedAccessException("Неверный пароль пользователя");
            }

            var token = GenerateToken(user);
            
            return new AuthResponse
            {
                Token = token,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
        }

        public async Task<RegisterResponse> Register(RegisterRequest request)
        {
            var isUserAlreadyExists = await IsUserAlreadyExists(request);
            if (isUserAlreadyExists)
            {
                throw new UserServiceException("Пользователь с таким именем уже существует");
            }

            var salt = CryptoExtensions.GenerateSalt(SaltLength);
            var hash = CryptoExtensions.CreateHash(request.Password, salt);
            var user = new User()
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                PwdSalt = salt,
                PwdHash = hash
            };
            var token = GenerateToken(user);
            await _repository.Users.AddAsync(user);
            await _repository.SaveChangesAsync();
            return new RegisterResponse()
            {
                Token = token
            };
        }

        private async Task<bool> IsUserAlreadyExists(RegisterRequest request)
        {
            var user = await _repository.Users.SingleOrDefaultAsync(u => u.Name == request.Name);
            return user != null;
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_options.Value.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = "Chat-Api",
                Audience = "Chat-frontend",
                Expires = DateTime.UtcNow.AddHours(3),
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("name", user.Name),
                    new Claim("phone", user.PhoneNumber),
                    new Claim("email", user.Email)
                }),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsPasswordCorrect(User user, string password)
        {
            var currentHash = CryptoExtensions.CreateHash(password, user.PwdSalt);
            return currentHash == user.PwdHash;
        }
    }
}