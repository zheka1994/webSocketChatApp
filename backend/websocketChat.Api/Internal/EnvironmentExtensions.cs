using System;

namespace websocketChat.Api.Internal
{
    public class EnvironmentExtensions
    {
        private static string pgUser;
        private static string pgHost;
        private static string pgDatabase;
        private static string pgPassword;
        private static string pgPort;
        private static string redisHost;
        private static string redisPort;

        public static string PgUser => pgUser;
        public static string PgHost => pgHost;
        public static string PgDatabase => pgDatabase;
        public static string PgPassword => pgPassword;
        public static string PgPort => pgPort;
        public static string RedisHost => redisHost;
        public static string RedisPort => redisPort;

        static EnvironmentExtensions()
        {
            pgUser = Environment.GetEnvironmentVariable("PG_USER");
            pgHost = Environment.GetEnvironmentVariable("PG_HOST");
            pgDatabase = Environment.GetEnvironmentVariable("PG_DATABASE");
            pgPassword = Environment.GetEnvironmentVariable("PG_PASSWORD");
            pgPort = Environment.GetEnvironmentVariable("PG_PORT");
            redisHost = Environment.GetEnvironmentVariable("REDIS_HOST");
            redisPort = Environment.GetEnvironmentVariable("REDIS_PORT");
        }
        
        public static string GetDbConnectionString()
        {
            if (!string.IsNullOrWhiteSpace(pgHost)
                && !string.IsNullOrWhiteSpace(pgDatabase)
                && !string.IsNullOrWhiteSpace(pgUser)
                && !string.IsNullOrWhiteSpace(pgPassword))
            {
                return $"Host={pgHost};Database={pgDatabase};Username={pgUser};Password={pgPassword}";
            }

            throw new ArgumentNullException("One of parameter of Db env is null, white space or empty");
        }

        public static string GetRedisConnectionString()
        {
            if (!string.IsNullOrWhiteSpace(redisHost) && !string.IsNullOrWhiteSpace(redisPort))
            {
                return $"{redisHost}:{redisPort}";
            }

            throw new ArgumentNullException("One of parameter of Redis env is null, white space or empty");
        }
    }
}