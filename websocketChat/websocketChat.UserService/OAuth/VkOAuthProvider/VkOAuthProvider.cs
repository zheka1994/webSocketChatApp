using Microsoft.EntityFrameworkCore;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models;

namespace websocketChat.UserService.OAuth.VkOAuthProvider
{
    public class VkOAuthProvider : IOAuthProvider
    {
        private readonly VkAuthOptions _options;
        private readonly IRepository _repository;
        public VkOAuthProvider(VkAuthOptions options, IRepository repository)
        {
            _options = options;
            _repository = repository;
        }
        public async Task<AuthResponse> Authorize(OAuthRequest request)
        {
            try
            {
                var tokenResponse = await GetTokenAsync(request.Code, request.RedirectUri);
                string email = tokenResponse.Email;
                const string userNotFoundExceptionMessage = "Такого пользователя не существует! Необходимо зарегистрироваться!";
                if (string.IsNullOrEmpty(email))
                {
                    throw new UserServiceException(userNotFoundExceptionMessage);
                }
                var user = await _repository.Users.SingleOrDefaultAsync(u => u.Email == email);
                if (string.IsNullOrEmpty(email))
                {
                    throw new UserServiceException(userNotFoundExceptionMessage);
                }
                var token = JwtTokenExtensions.GenerateToken(GetUserIdentityFromUser(user), _jwtOptions?.Value);

                return new AuthResponse
                {
                    Token = token,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };
                return null;
            }
            catch (UserServiceException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task<AccessTokenResponse> GetTokenAsync(string code, string redirectUri)
        {
            var client = new HttpClient();
            var tokenUri = BuildTokenUri(code, redirectUri);
            var response = await client.GetAsync(tokenUri);
            var accessTokenResponseString = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                try
                {
                    var tokenResponse = JsonSerializer.Deserialize<AccessTokenResponse>(accessTokenResponseString);
                    return tokenResponse;
                }
                catch (Exception)
                {
                    throw;
                }
            }

            var errorResponse = JsonSerializer.Deserialize<AccessTokenError>(accessTokenResponseString);
            throw new UserServiceException(errorResponse.ErrorDescription);
        }

        private string BuildTokenUri(string code, string redirectUri)
        {
            return $"{_options.TokenEndpoint}?client_id={_options.ClientId}&client_secret={_options.ClientSecret}&redirect_uri={redirectUri}&code={code}&scope=email";
        }
        
    }
}