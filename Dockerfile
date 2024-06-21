#FRONT
#скачиваем и разворачиваем базовый образ сервера вместе с node и npm
FROM node:19.7-alpine as builder
#указываем рабочую директорию на созданном образе сервере
WORKDIR /app
#копируем файл package-lock.json, который наиболее точно определяет нужные версии, а не заново составляет список зависимостей
COPY package*.json ./
#добавляем прокси, запускаем загрузку пакетов по вышеуказанному файлику
RUN npm config set proxy http://proxy.bb.asb:3128
RUN npm config set https-proxy http://proxy.bb.asb:3128
RUN npm config set strict-ssl false
RUN npm ci
#RUN npm i --omit=dev
#RUN npm update --save
#копируем остальные файлы из текущей папки в рабочую директорию на созданном образе сервера, за исключением указанных в .dockerignore
COPY . .
#запускаем билд проекта
RUN npm run build

#NGINX
#скачиваем и устанавливаем nginx для публикации статики
FROM nginx:1.23.3-alpine
#копируем статику с билда в папку html nginx'a
COPY --from=builder /app/build /usr/share/nginx/html
#копируем настроечный файл для nginx'а
COPY nginx.conf /etc/nginx/conf.d/default.conf
#открываем порт, по которому этот образ сервера будет доступен во вне
EXPOSE 3000
#запускаем nginx
CMD ["nginx", "-g", "daemon off;"]