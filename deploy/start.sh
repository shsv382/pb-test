#!/bin/bash

# Собираем Docker-образ
docker build -t pb-test .

# Запускаем контейнер
docker run -d --name pb-test -p 3003:3003 -v "$(pwd):/usr/share/nginx/html" pb-test

# Устанавливаем права доступа для файлов на хосте
sudo chown -R 101:101 "$(pwd)"  # 101 — это UID и GID пользователя nginx в Alpine
sudo chmod -R 755 "$(pwd)"