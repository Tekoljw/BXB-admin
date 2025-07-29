#!/bin/bash

# BeDAO Platform - Deployment Build Script
# Comprehensive build process with static fallback support

set -e  # Exit on any error

echo "🚀 Starting BeDAO Platform deployment build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf public/.next
rm -rf dist

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check environment and deployment mode
if [ "$STATIC_EXPORT" = "true" ]; then
    echo "📦 Building for STATIC deployment..."
    export NODE_ENV=production
    export STATIC_EXPORT=true
    
    # Build static export
    npm run build
    
    # Verify static export
    if [ -d "out" ]; then
        echo "✅ Static export successful"
        
        # Copy index.html to root for static hosting
        if [ -f "public/index.html" ]; then
            cp public/index.html out/index.html
            echo "✅ Index.html copied to static output"
        fi
        
        # Create .nojekyll for GitHub Pages compatibility
        touch out/.nojekyll
        echo "✅ Static deployment optimizations applied"
    else
        echo "❌ Static export failed"
        exit 1
    fi
else
    echo "🚀 Building for AUTOSCALE deployment (recommended)..."
    export NODE_ENV=production
    
    # Standard Next.js build for server deployment
    npm run build
    
    # Verify build success
    if [ -d ".next" ]; then
        echo "✅ Next.js build successful"
        
        # Check for standalone output
        if [ -d ".next/standalone" ]; then
            echo "✅ Standalone server build created"
        fi
    else
        echo "❌ Next.js build failed"
        exit 1
    fi
fi

# Deployment verification
echo "🔍 Deployment verification..."

# Check build output size
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    echo "📊 Build size: $BUILD_SIZE"
fi

if [ -d "out" ]; then
    STATIC_SIZE=$(du -sh out | cut -f1)
    echo "📊 Static export size: $STATIC_SIZE"
fi

# Check essential files
echo "🔍 Checking essential files..."

files_to_check=(
    "public/index.html"
    "next.config.mjs"
    "package.json"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "⚠️  $file missing"
    fi
done

# Final deployment readiness check
echo "🎯 Deployment readiness check..."

if [ "$STATIC_EXPORT" = "true" ] && [ -d "out" ]; then
    echo "✅ Ready for STATIC deployment"
    echo "📁 Static files in: ./out/"
    echo "🔗 Entry point: out/index.html"
elif [ -d ".next" ]; then
    echo "✅ Ready for AUTOSCALE deployment"
    echo "📁 Server files in: ./.next/"
    echo "🔗 Start command: npm start"
    echo "🌐 Server mode: Next.js standalone"
else
    echo "❌ Deployment build failed"
    exit 1
fi

echo "🎉 Build process completed successfully!"

# Display deployment instructions
echo ""
echo "📋 DEPLOYMENT INSTRUCTIONS:"
echo "=========================="
if [ "$STATIC_EXPORT" = "true" ]; then
    echo "1. Select 'Static' deployment type in Replit"
    echo "2. Set public directory to: ./out"
    echo "3. Entry file: index.html"
    echo "4. Build command: ./build-deploy.sh"
else
    echo "1. Select 'Autoscale' deployment type in Replit (RECOMMENDED)"
    echo "2. Build command: npm run build"
    echo "3. Start command: npm start"
    echo "4. Port: 5000"
    echo ""
    echo "📝 For static fallback: STATIC_EXPORT=true ./build-deploy.sh"
fi

echo ""
echo "🔥 BeDAO Platform is ready for deployment!"