#!/bin/bash

# Deploy script for BeDAO-ho Next.js Application
# This script prepares the application for Replit Autoscale deployment

echo "🚀 Starting deployment preparation..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📄 Generated files:"
    ls -la .next/
    
    echo ""
    echo "🌟 Application is ready for deployment!"
    echo "🔗 This is a Next.js application configured for Autoscale deployment"
    echo "📋 Make sure to:"
    echo "   1. Set deployment type to 'Autoscale' (not static)"
    echo "   2. Set build command to: npm run build"
    echo "   3. Set start command to: npm start"
    echo "   4. Ensure DATABASE_URL is set in environment variables"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi