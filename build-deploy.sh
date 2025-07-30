#!/bin/bash

# BeDAO-ho Optimized Deployment Build Script
# Handles React 19 dependency compatibility issues and production deployment

echo "🚀 Starting BeDAO-ho deployment build..."

# Set environment variables for legacy peer deps
export NPM_CONFIG_LEGACY_PEER_DEPS=true
export REPLIT_DISABLE_PACKAGE_LAYER=true
export NODE_ENV=production

# Skip dependency reinstall if node_modules exists and is valid
if [ -d "node_modules" ] && [ -f "node_modules/.package-lock.json" ]; then
    echo "📦 Using existing dependencies..."
else
    echo "📦 Installing dependencies with legacy peer deps..."
    rm -rf node_modules package-lock.json pnpm-lock.yaml
    npm install --legacy-peer-deps --force
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

# Verify build completion
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build statistics:"
    ls -la .next/
    echo "📋 Standalone server ready:"
    ls -la .next/standalone/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Production deployment ready for Replit!"