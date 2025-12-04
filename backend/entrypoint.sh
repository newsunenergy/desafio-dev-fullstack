#!/bin/sh
set -e

echo "Starting NestJS application with migrations..."

# Run migrations and wait for MySQL
node /app/infra/scripts/migrate.mjs

# Start the application
exec node /app/dist/main
