Для запуска api с dev конфигом переходим в директорию backend и запускаем
```
docker build -t eguziy/backend -f Dockerfile.dev .  
docker run -p 5001:5000 --env ASPNETCORE_ENVIRONMENT='Development' --env ASPNETCORE_URLS="http://+:5000" eguziy/backend
```

Для запуска docker-compose переходим в корневую директорию приложения:
```
docker-compose -f docker-compose.dev.yaml up --build
```
Миграция без докера
```
Перейти в папку с проектом webSocketChat.Data
и выполнить следующие команды
dotnet ef --startup-project ../websocketChat.Api migrations add AddChatTables
dotnet ef --startup-project ../websocketChat.Api database update
```