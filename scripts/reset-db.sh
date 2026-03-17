#!/bin/bash
set -e

echo "🔄 Resetting database..."

# Run Prisma migrations
echo "📦 Running Prisma migrations..."
npm run db:migrate

# Run database seed
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Database reset complete!"
