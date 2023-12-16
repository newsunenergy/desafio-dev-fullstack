FROM node:18-alpine as build
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --quiet --no-optional --no-fund --loglevel=error
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY nest-cli.json ./nest-cli.json
COPY src ./src
RUN yarn prisma generate
RUN yarn build


FROM node:18-alpine 
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["yarn","start:prod"]
