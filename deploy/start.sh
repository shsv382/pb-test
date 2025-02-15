#!/bin/bash
docker build -t service-structure .
docker run -d --name service-structure -p 5050:5050 -v "$(pwd):/usr/share/nginx/html" service-structure