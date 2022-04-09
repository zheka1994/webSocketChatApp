using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace websocketChat.Api.Internal
{
    public static class AuthorizationServicesConfiguration
    {
        public static void AddAuthorizationServices(this IServiceCollection services, IConfiguration _configuration)
        {
            services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    var jwtOptionsSection = _configuration
                        .GetSection("AppSettings")
                        ?.GetSection("JwtOptions");
                    var issuerSigningKey = jwtOptionsSection
                        ?.GetSection("SecretKey")?.Value;
                    var validIssuer = jwtOptionsSection
                        ?.GetSection("Issuer")?.Value;
                    var validAudience = jwtOptionsSection
                        ?.GetSection("Audience")?.Value;

                    TimeSpan expirationTimeHours = TimeSpan.FromHours(1);
                    if (double.TryParse(jwtOptionsSection?.GetSection("ExpirationTimeHours")?.Value, out double time))
                    {
                        expirationTimeHours = TimeSpan.FromHours(time);
                    }

                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        IssuerSigningKey =
                            new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(issuerSigningKey!)),
                        ValidateIssuer = true,
                        ValidIssuer = validIssuer,
                        ValidateAudience = true,
                        ValidAudience = validAudience,
                        RequireExpirationTime = true,
                        ValidateLifetime = true,
                        ClockSkew = expirationTimeHours
                    };
                });
        }
    }
}