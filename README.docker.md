# Docker Setup Guide

This project uses Docker only for PostgreSQL database. The application runs locally on your machine.

## Prerequisites

- Docker and Docker Compose installed
- Node.js installed (for running the app)

## Quick Start

### 1. First Time Setup

Run the setup script to start PostgreSQL, run migrations, and seed the database:

```bash
npm run db:setup
```

This will:
- Start PostgreSQL container
- Wait for it to be ready
- Run Prisma migrations
- Seed the database with initial data

### 2. Start Your Application

```bash
npm run dev
```

Your GraphQL server will be available at `http://localhost:4000`

## Available Commands

### Database Management

```bash
# Setup database (first time or after clean)
npm run db:setup

# Reset database (re-run migrations and seed)
npm run db:reset

# Stop PostgreSQL container
npm run db:stop

# Start PostgreSQL container only
docker compose up -d postgres

# View PostgreSQL logs
docker compose logs -f postgres
```

### Development

```bash
# Run app in development mode
npm run dev

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## Database Connection

The application connects to PostgreSQL using these credentials:

- **Host:** localhost
- **Port:** 5432
- **Database:** hotel_db
- **User:** hotel_user
- **Password:** hotel_password
- **Schema:** hotel

**Connection String:**
```
postgresql://hotel_user:hotel_password@localhost:5432/hotel_db?schema=hotel
```

## Seeded Data

After running `npm run db:setup`, your database will contain:

### Users (5 total)
- 2 Staff members:
  - `staff_john` (staff1@hotel.com)
  - `staff_sarah` (staff2@hotel.com)
- 3 Customers:
  - `alice_wonder` (customer1@example.com)
  - `bob_builder` (customer2@example.com)
  - `charlie_brown` (customer3@example.com)

**All users have password:** `password123`

### Rooms (20 total)
- Single rooms: 101-104, 401 ($80-$90)
- Double rooms: 201-206, 402 ($120-$135)
- Luxury rooms: 301-304, 403, 501-503 ($250-$400)

## Troubleshooting

### PostgreSQL won't start
```bash
# Stop all containers
docker compose down

# Remove volumes and restart
docker compose down -v
npm run db:setup
```

### Connection refused
Make sure PostgreSQL container is running:
```bash
docker compose ps
```

### Reset everything
```bash
# Stop and remove everything
docker compose down -v

# Start fresh
npm run db:setup
```

## Docker Compose Services

- **postgres**: PostgreSQL 16 Alpine
  - Exposed on port 5432
  - Data persisted in Docker volume `postgres_data`
  - Auto-creates `hotel` schema on initialization
