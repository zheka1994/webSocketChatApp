using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using websocketChat.Core.Models;
using websocketChat.UserService.Exceptions;
using websocketChat.UserService.Models;

namespace websocketChat.UserService.OAuth.VkOAuthProvider
{
    public class VkOAuthProvider : IOAuthProvider
    {
        private readonly VkAuthOptions _options;
        public VkOAuthProvider(VkAuthOptions options)
        {
            _options = options;
        }
        public async Task<AuthResponse> Authorize(OAuthRequest request)
        {
            try
            {
                var tokenResponse = await GetTokenAsync(request.Code, request.RedirectUri);
                return null;
            }
            catch (UserServiceException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
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
                return JsonSerializer.Deserialize<AccessTokenResponse>(accessTokenResponseString);
            }

            var errorResponse = JsonSerializer.Deserialize<AccessTokenError>(accessTokenResponseString);
            throw new UserServiceException(errorResponse.ErrorDescription);
        }

        private string BuildTokenUri(string code, string redirectUri)
        {
            return $"{_options.TokenEndpoint}?client_id={_options.ClientId}&client_secret={_options.ClientSecret}&redirect_uri={redirectUri}&code={code}";
        }

        private async Task GetAccountInfo(string token)
        {
            var client = new HttpClient();
            // var tokenUri = BuildTokenUri(code, redirectUri);
            //var response = await client.GetAsync(tokenUri);
        }

        private string BuildUserInfoUri(string token)
        {
            return $"{_options.ApiVkEndpoint}/method/account.getInfo";
        }
        
    }
}