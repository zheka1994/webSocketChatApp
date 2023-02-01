using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using websocketChat.Core.Authorization;
using websocketChat.Core.Models;
using websocketChat.Data;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models;

namespace websocketChat.UserService.OAuth.GoogleOAuthProvider
{
    public class GoogleOAuthProvider : IOAuthProvider
    {
        private readonly GoogleAuthOptions _googleAuthOptions;
        private readonly JwtOptions _jwtOptions;
        private readonly IRepository _repository;

        public GoogleOAuthProvider(GoogleAuthOptions googleAuthOptions, IRepository repository, JwtOptions jwtOptions)
        {
            _googleAuthOptions = googleAuthOptions;
            _jwtOptions = jwtOptions;
            _repository = repository;
        }

        public async Task<AuthResponse> Authorize(OAuthRequest request)
        {
            try
            {
                var tokenResponse = await GetTokenAsync(request.Code, request.RedirectUri);
                string email = await GetEmailAsync(tokenResponse.AccessToken);
                const string userNotFoundExceptionMessage = "Такого пользователя не существует! Необходимо зарегистрироваться!";
                if (string.IsNullOrEmpty(email))
                {
                    throw new UserServiceException(userNotFoundExceptionMessage);
                }
                var user = await _repository.Users.SingleOrDefaultAsync(u => u.Email == email);
                if (user == null)
                {
                    throw new UserServiceException(userNotFoundExceptionMessage);
                }
                var token = JwtTokenExtensions.GenerateToken(UserIdentityHelper.GetUserIdentityFromUser(user), _jwtOptions);

                return new AuthResponse
                {
                    Token = token,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };
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
            code = WebUtility.UrlDecode(code);
            var tokenUri = BuildTokenUri(code, redirectUri);
            var formData = new []
            {
                new KeyValuePair<string, string>("code", code),
                new KeyValuePair<string, string>("client_id", _googleAuthOptions.ClientId),
                new KeyValuePair<string, string>("client_secret", _googleAuthOptions.ClientSecret),
                new KeyValuePair<string, string>("redirect_uri", redirectUri),
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
            };
            FormUrlEncodedContent formContent = new FormUrlEncodedContent(formData);
            var response = await client.PostAsync(tokenUri, formContent);
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
            return $"{_googleAuthOptions.TokenEndpoint}";
        }

        private async Task<string> GetEmailAsync(string token)
        {
            var client = new HttpClient();
            var profileUri = BuildProfileUri(token);
            var response = await client.GetAsync(profileUri);

            if (response.IsSuccessStatusCode)
            {
                try
                {
                    var profileResponseString = await response.Content.ReadAsStringAsync();
                    var profileResponse = JsonSerializer.Deserialize<ProfileResponse>(profileResponseString);
                    return profileResponse?.Email ?? string.Empty;
                }
                catch (Exception)
                {
                    throw;
                }
            }

            return string.Empty;
        }

        private string BuildProfileUri(string token)
        {
            return $"{_googleAuthOptions.MethodsBaseEndpoint}/userinfo?access_token={token}";
        }
    }
}
