#!/bin/bash

# BeDAO-ho Deployment Build Script
# Handles React 19 dependency compatibility issues

echo "🚀 Starting BeDAO-ho deployment build..."

# Set environment variables for legacy peer deps
export NPM_CONFIG_LEGACY_PEER_DEPS=true
export REPLIT_DISABLE_PACKAGE_LAYER=true

# Clean install with legacy peer deps and force latest compatible versions
echo "📦 Installing dependencies with legacy peer deps..."
rm -rf node_modules package-lock.json pnpm-lock.yaml
npm install --legacy-peer-deps --force

# Force update react-day-picker to ensure React 19 compatibility
echo "🔄 Ensuring react-day-picker React 19 compatibility..."
npm install react-day-picker@^9.8.1 --legacy-peer-deps --save --force

# Verify react-day-picker version compatibility
echo "🔍 Verifying react-day-picker compatibility..."
REACT_DAY_PICKER_VERSION=$(npm ls react-day-picker --depth=0 2>/dev/null | grep react-day-picker | awk '{print $2}' || echo "not found")
echo "react-day-picker version: $REACT_DAY_PICKER_VERSION"

# Additional compatibility checks
echo "📋 React version compatibility check..."
REACT_VERSION=$(npm ls react --depth=0 2>/dev/null | grep " react@" | awk '{print $2}' || echo "not found")
echo "React version: $REACT_VERSION"

# Verify all peer dependencies are resolved
echo "🔧 Checking for any peer dependency warnings..."
npm ls --depth=0 2>&1 | grep -i "peer dep" || echo "No peer dependency issues found"

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