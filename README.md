# Docker Setup Guide

This project uses Docker only for PostgreSQL database. The application runs locally on your machine.

## Prerequisites

- Docker and Docker Compose installed
- Node.js installed (for running the app)

## Quick Start

### 1. First Time Setup

To install all packages:

```bash
npm install
```

Ensure scripts are executable:

```bash
chmod +x scripts/*.sh
```

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

