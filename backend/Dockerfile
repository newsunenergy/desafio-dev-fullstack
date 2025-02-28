FROM node:latest

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm run build

RUN pnpm prune --prod

EXPOSE 8000

CMD ["pnpm", "start:prod"]