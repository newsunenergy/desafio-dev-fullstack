FROM nginx

WORKDIR /home/app

RUN apt update
RUN apt install -y node npm

RUN npm install yarn -g
RUN npm install pm2 -g
RUN npm install @nestjs/cli -g

COPY ./nginx/default.conf /etc/nginx/sites-enabled/default
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN yarn build
# TODO finish, separar workspaces yarn

ENTRYPOINT tail -f /dev/null
