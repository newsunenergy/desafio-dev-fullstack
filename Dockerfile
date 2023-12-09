FROM node:alpine

WORKDIR /home/app

RUN apk update
# RUN apt --fix-broken install -y
RUN apk add git sudo curl procps wget
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN npm install pm2 -g
RUN npm install @nestjs/cli -g

USER node

ENTRYPOINT tail -f /dev/null
