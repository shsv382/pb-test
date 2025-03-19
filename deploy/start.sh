#!/bin/bash
docker build -t pb-test .
docker run -d --name pb-test -p 3003:3003 -v "$(pwd):/usr/share/nginx/html" pb-test