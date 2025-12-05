# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Accept build arguments
ARG NEXT_PUBLIC_API_URL=http://backend:8080

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./

# Install dependencies
RUN npm ci

# Copy source code
COPY app ./app
COPY lib ./lib
COPY public ./public
COPY types ./types

# Build Next.js application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Install curl for health check
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nextjs --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chmod -R 755 /app/public && \
    chmod -R 755 /app/.next

USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Start application (standalone server)
CMD ["node", "server.js"]
