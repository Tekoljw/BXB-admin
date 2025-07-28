#!/bin/bash

# Build script for Replit deployment
echo "Building Next.js application..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "Building production build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Starting application..."
    npm start -- --port 5000
else
    echo "Build failed!"
    exit 1
fi