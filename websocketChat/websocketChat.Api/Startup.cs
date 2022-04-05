using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using websocketChat.Api.Filters;
using websocketChat.Api.Internal;
using websocketChat.Core.Models;
using websocketChat.Data;

namespace websocketChat.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            string envName = environment.EnvironmentName;
            string fileName = string.IsNullOrEmpty(envName)
                ? "appsettings.json"
                : $"appsettings.{envName}.json";
            var builder = new ConfigurationBuilder()
                .AddJsonFile(fileName);
            _configuration = builder.Build();
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            string dbConnectionString = _configuration
                .GetSection("AppSettings")
                ?.GetSection("ConnectionStrings")
                ?.GetSection("Db")
                ?.Value ?? "";
            services.AddOptions();
            services.Configure<UserServiceOptions>(_configuration
                .GetSection("AppSettings")
                ?.GetSection("UserServiceOptions"));
            services.AddDbContext<ChatDbContext>(options => options
                .UseNpgsql(dbConnectionString)
                .UseSnakeCaseNamingConvention()
                .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                .EnableSensitiveDataLogging());
            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(new ExceptionFilter());
            });
            services.AddAppServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}");
            });
        }
    }
}