FROM node:22.16.0-alpine3.22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=3005
EXPOSE $PORT
CMD ["npm", "run", "start"]