#!/bin/bash
set -e

echo "🚀 Setting up database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker first."
  exit 1
fi

# Start PostgreSQL container
echo "🐘 Starting PostgreSQL container..."
docker compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker compose exec postgres pg_isready -U hotel_user -d hotel_db > /dev/null 2>&1; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# Run Prisma migrations
echo "📦 Running Prisma migrations..."
npm run db:migrate

# Run database seed
echo "🌱 Seeding database..."
npm run db:seed

echo "✨ Database setup complete!"
echo ""
echo "📊 Database connection details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: hotel_db"
echo "   User: hotel_user"
echo "   Password: hotel_password"
echo "   Schema: hotel"
echo ""
echo "🔗 Connection string:"
echo "   postgresql://hotel_user:hotel_password@localhost:5432/hotel_db?schema=hotel"
