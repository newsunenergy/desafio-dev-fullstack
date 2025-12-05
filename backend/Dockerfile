# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY infra ./infra

# Build NestJS application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Install curl for health check and netcat for wait-for-mysql
RUN apk add --no-cache curl netcat-openbsd

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/infra ./infra
COPY entrypoint.sh ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chmod +x /app/entrypoint.sh

USER nestjs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
    CMD curl -f http://localhost:8080/leads || exit 1

# Start application with migrations
CMD ["/app/entrypoint.sh"]
