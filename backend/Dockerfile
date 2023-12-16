FROM node:alpine

WORKDIR /home/backend

RUN apk update
RUN apk add bash

RUN npm install @nestjs/cli -g

ENTRYPOINT tail -f /dev/null
