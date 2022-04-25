using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using websocketChat.Core;
using websocketChat.Core.Authorization;
using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.Data.Models;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models;
using websocketChat.UserService.Models.Enums;
using websocketChat.UserService.OAuth;

namespace websocketChat.UserService
{
    public class UserService : IUserService
    {
        private readonly IRepository _repository;
        private readonly IOptions<JwtOptions> _jwtOptions;
        private readonly IOptions<OAuthOptions> _oAuthOptions;
        private const int SaltLength = 8;

        public UserService(IRepository repository, IOptions<JwtOptions> jwtOptions, IOptions<OAuthOptions> oAuthOptions)
        {
            _repository = repository;
            _jwtOptions = jwtOptions;
            _oAuthOptions = oAuthOptions;
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

            var token = JwtTokenExtensions.GenerateToken(UserIdentityHelper.GetUserIdentityFromUser(user), _jwtOptions?.Value);
            
            return new AuthResponse
            {
                Token = token,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
        }

        public async Task<AuthResponse> OAuthorize(OAuthRequest request)
        {
            var oAuthProvider = new OAuthProviderFactory()
                .GetAuthProvider(request.Type, _oAuthOptions.Value, _repository, _jwtOptions.Value);
            var result = await oAuthProvider.Authorize(request);
            return result;
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
            var token = JwtTokenExtensions.GenerateToken(UserIdentityHelper.GetUserIdentityFromUser(user), _jwtOptions?.Value);
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

        private bool IsPasswordCorrect(User user, string password)
        {
            var currentHash = CryptoExtensions.CreateHash(password, user.PwdSalt);
            return currentHash == user.PwdHash;
        }
    }
}