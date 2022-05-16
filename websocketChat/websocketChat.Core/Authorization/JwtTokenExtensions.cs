using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using websocketChat.Core.Models;

namespace websocketChat.Core.Authorization
{
    public static class JwtTokenExtensions
    {
        public static IEnumerable<Claim> GetClaims(this UserIdentity user)
        {
            return new[]
            {
                new Claim("name", user.Name),
                new Claim("phone", user.PhoneNumber),
                new Claim("email", user.Email)
            };
        }
        
        public static string GenerateToken(UserIdentity user, JwtOptions options)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(options.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = "Chat-Api",
                Audience = "Chat-frontend",
                Expires = DateTime.UtcNow.AddHours(3),
                Subject = new ClaimsIdentity(user.GetClaims()),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static Dictionary<string, Claim> GetClaimsByToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(token);
            return jsonToken?.Claims?.GroupBy(c => c.Type).ToDictionary(group => group.Key, group => group.Last());
        }
    }
}