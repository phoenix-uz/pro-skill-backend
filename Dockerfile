# Используем Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт
EXPOSE 3000

# Выполняем миграции и запускаем приложение
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
