using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using websocketChat.Core.Authorization;

namespace websocketChat.Api.Internal
{
    public static class AuthenticationServicesConfiguration
    {
        public static void AddAuthenticationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var jwtOptionsSection = configuration
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
            /* .AddOAuth("vkOauth", options =>
            {
                var vkAuthOptionsSection = configuration
                    .GetSection("AppSettings")
                    ?.GetSection("VkAuthOptions");
                options.AuthorizationEndpoint = vkAuthOptionsSection?.GetSection("AuthorizationEndpoint").Value!;
                options.ClientId = vkAuthOptionsSection?.GetSection("ClientId").Value!;
                options.TokenEndpoint = vkAuthOptionsSection?.GetSection("TokenEndpoint").Value!;
                options.ClientSecret = vkAuthOptionsSection?.GetSection("ClientSecret").Value!;
                options.UserInformationEndpoint = "/api/v1/user/userInformation";
                options.CallbackPath = "/api/v1/user/callback";
                options.Scope.Add("email");
            }); */
        }
    }
}