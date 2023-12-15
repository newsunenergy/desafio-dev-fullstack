FROM node:alpine

WORKDIR /home/app

RUN apk update

RUN npm install pm2 -g
RUN npm install @nestjs/cli -g

ENTRYPOINT tail -f /dev/null
