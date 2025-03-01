FROM node:22-alpine3.20

WORKDIR /app
RUN npm install --global pm2
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
USER node
CMD [ "pm2-runtime", "start", "npm", "--", "run", "start" ]