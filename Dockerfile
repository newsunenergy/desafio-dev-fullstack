FROM nginx

WORKDIR /home/app

RUN apt update
RUN apt install -y nodejs npm

RUN npm install yarn -g
RUN npm install pm2 -g
RUN npm install @nestjs/cli -g

COPY ./nginx/default.conf /etc/nginx/sites-enabled/default
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./package.json /home/app/
COPY ./frontend /home/app/frontend
COPY ./backend /home/app/backend
COPY ./entrypoint.sh /home/app/

RUN yarn install
RUN yarn build

ENTRYPOINT sh entrypoint.sh
