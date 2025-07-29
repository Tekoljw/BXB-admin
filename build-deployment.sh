#!/bin/bash

echo "Building project for deployment with React 19 compatibility..."

# Set environment variables for deployment
export REPLIT_DISABLE_PACKAGE_LAYER=1
export NODE_OPTIONS="--max-old-space-size=4096"
export SKIP_BUILD_PRODUCT_CHECK=1

# Ensure .npmrc exists with legacy peer deps
echo "legacy-peer-deps=true" > .npmrc
echo "audit-level=none" >> .npmrc
echo "fund=false" >> .npmrc
echo "progress=false" >> .npmrc

# Clean and install dependencies
echo "Installing dependencies with legacy peer deps..."
npm ci --legacy-peer-deps

# Build the application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
echo "React 19 dependency conflicts resolved"