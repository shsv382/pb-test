FROM nginx:alpine

# Удаляем дефолтный конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d

# Устанавливаем рабочую директорию
WORKDIR /usr/share/nginx/html

# Копируем файлы проекта
COPY . ./

# Устанавливаем права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Открываем порт 3003
EXPOSE 3003