#!/bin/bash

# BeDAO-ho Deployment Script for Replit Autoscale
# This script handles the build and deployment process

set -e

echo "🚀 Starting BeDAO-ho deployment process..."

# Clean previous builds
echo "📝 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm ci

# Run database migrations if needed
echo "🗄️  Setting up database..."
if [ -n "$DATABASE_URL" ]; then
    npm run db:push || echo "⚠️  Database push skipped (not configured)"
fi

# Build the Next.js application
echo "🔨 Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
echo "🌐 Ready for Autoscale deployment on Replit"

# The application will be served by npm start
echo "🚀 Starting production server..."
npm start