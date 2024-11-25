# Etapa 1: Construção
FROM node:16 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc

# Etapa 2: Execução
FROM node:16

WORKDIR /app
COPY --from=build /app /app
CMD ["node", "dist/server.js"]
