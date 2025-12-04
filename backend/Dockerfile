FROM node:20-bullseye-slim
RUN apt-get update && apt-get install -y ca-certificates openssl **netcat** && rm -rf /var/lib/apt/lists/*


RUN apt-get update && apt-get install -y \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npx prisma generate

RUN npm run build

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["node", "dist/main"]