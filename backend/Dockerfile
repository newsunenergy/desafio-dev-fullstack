FROM node:18.12-bullseye-slim AS build

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

FROM node:18.12-bullseye-slim AS production

WORKDIR /app

COPY --from=build /app/.env ./.env
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:prod"]