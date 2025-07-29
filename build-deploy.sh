#!/bin/bash

# BeDAO-ho Deployment Build Script
# Handles React 19 dependency compatibility issues

echo "🚀 Starting BeDAO-ho deployment build..."

# Set environment variables for legacy peer deps
export NPM_CONFIG_LEGACY_PEER_DEPS=true
export REPLIT_DISABLE_PACKAGE_LAYER=true

# Clean install with legacy peer deps
echo "📦 Installing dependencies with legacy peer deps..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Verify react-day-picker version compatibility
echo "🔍 Verifying react-day-picker compatibility..."
REACT_DAY_PICKER_VERSION=$(npm ls react-day-picker --depth=0 | grep react-day-picker | awk '{print $2}')
echo "react-day-picker version: $REACT_DAY_PICKER_VERSION"

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

# Verify build completion
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build statistics:"
    ls -la .next/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Deployment build ready!"