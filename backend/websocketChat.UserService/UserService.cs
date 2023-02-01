using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using websocketChat.Core;
using websocketChat.Core.Authorization;
using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.Data.Models;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Internal;
using websocketChat.UserService.Models;
using websocketChat.UserService.Models.Enums;
using websocketChat.UserService.Models.Mapper;
using websocketChat.UserService.OAuth;
using webSocketChat.StorageService;

namespace websocketChat.UserService
{
    public class UserService : IUserService
    {
        private readonly IRepository _repository;
        private readonly IOptions<JwtOptions> _jwtOptions;
        private readonly IOptions<OAuthOptions> _oAuthOptions;
        private readonly IStorageService _storageService;
        private const int SaltLength = 8;

        public UserService(IRepository repository, IOptions<JwtOptions> jwtOptions, IOptions<OAuthOptions> oAuthOptions, IStorageService storageService)
        {
            _repository = repository;
            _jwtOptions = jwtOptions;
            _oAuthOptions = oAuthOptions;
            _storageService = storageService;
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

        public async Task<UserInfo> GetUserInfo(string name, string phoneNumber)
        {
            var userData = await _repository.Users
                .Include(u => u.Chats)
                    .ThenInclude(c => c.Parties)
                .Include(u => u.Chats)
                    .ThenInclude(c => c.Messages)
                    .ThenInclude(m => m.User)
                .Include(u => u.Chats)
                    .ThenInclude(c => c.User)
                .SingleOrDefaultAsync(u => u.Name == name
                                && u.PhoneNumber == phoneNumber);
            var userFriends = await _repository.Friends.Where(f => f.FriendOneId == userData.ID)
                .Join(_repository.Users,
                    f => f.FriendTwoId,
                    u => u.ID,
                    (f, u) => new
                    {
                        u.Name,
                        u.Email,
                        u.PhoneNumber,
                        f.Status
                    })
                .ToListAsync();
            var result = new UserInfo {
                User = userData.TransformToDto(),
                Friends = userFriends.Select(uf => new Models.Friend
                {
                    Name = uf.Name,
                    Email = uf.Email,
                    PhoneNumber = uf.PhoneNumber,
                    Status = uf.Status
                }).ToList(),
                Chats = userData.Chats.Select(c => new Models.Chat
                {
                    Creator = c.User.TransformToDto(),
                    Name = c.Name,
                    Messages = c.Messages.Select(m => new Models.Message
                    {
                        Content = m.Content,
                        CreateDate = m.CreateDate,
                        User = m.User.TransformToDto()
                    }).ToList(),
                    Parties = c.Parties.Select(p => p.User.TransformToDto()).ToList()
                }).ToList(),
            };
            return result;
        }

        // TODO сделать через кеширование redis (пока через БД)
        public async Task<List<UserDto>> FindFriends(string query)
        {
            var userAutoComplete = new FriendsAutoComplete(_repository);
            var result = await userAutoComplete.GetUserSuggestions(query);
            return result;
        }

        public async Task<AvatarResponseDto> UploadAvatar(IFormFile file, string basePath, string name, string phoneNumber)
        {
            var user = await _repository.Users.FirstOrDefaultAsync(u => u.Name == name && u.PhoneNumber == phoneNumber);

            if (user == null)
            {
                throw new Exception("Такого пользователя не существует");
            }

            var fileName = await _storageService.UploadFile(file);
            var uri = $"{basePath}/{fileName}";
            user.AvatarUri = uri;
            await _repository.SaveChangesAsync();
            return new AvatarResponseDto
            {
                Uri = uri
            };
        }

        public Stream DownloadAvatar(string avatarFileName)
        {
            var stream = _storageService.DownloadFile(avatarFileName);
            return stream;
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