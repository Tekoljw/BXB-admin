#!/bin/bash

# Build script for Replit Autoscale deployment
echo "🚀 Starting Replit Autoscale deployment build..."

# Set production environment
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the Next.js application for standalone deployment
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📂 Build output ready in .next directory"
    echo "🎯 Deployment target: Autoscale (standalone)"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Ready for Replit Autoscale deployment!"