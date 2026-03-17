#!/bin/bash
set -e

echo "🛑 Stopping PostgreSQL container..."
docker compose down

echo "✅ PostgreSQL stopped!"
