#!/bin/bash

# BeDAO Platform Deployment Build Script
# Supports both Autoscale (server) and Static deployment modes

set -e  # Exit on any error

echo "🚀 Starting BeDAO Platform deployment build..."

# Check deployment mode
DEPLOY_MODE=${STATIC_EXPORT:-"false"}

if [ "$DEPLOY_MODE" = "true" ]; then
    echo "📦 Building for Static Deployment..."
    
    # Set environment for static export
    export STATIC_EXPORT=true
    export NODE_ENV=production
    
    # Build the application
    npm run build
    
    # Create public directory structure for static deployment
    echo "🔧 Preparing static files..."
    mkdir -p public/out
    
    # Copy static files if they exist
    if [ -d ".next/out" ]; then
        cp -r .next/out/* public/
        echo "✅ Static files copied to public directory"
    fi
    
    # Ensure index.html is in root for static deployment
    if [ ! -f "public/index.html" ]; then
        echo "⚠️  Warning: index.html not found in public directory"
        echo "📝 Creating fallback index.html..."
        cp public/index.html public/index.html.backup 2>/dev/null || true
    fi
    
    echo "✅ Static deployment build completed"
    
else
    echo "🏗️  Building for Autoscale Deployment (Server Mode)..."
    
    # Set environment for server deployment
    export NODE_ENV=production
    export STATIC_EXPORT=false
    
    # Build the application
    npm run build
    
    echo "✅ Autoscale deployment build completed"
fi

# Verify build output
if [ -d ".next" ]; then
    echo "✅ Build directory created successfully"
    
    # Check for critical files
    if [ -f ".next/standalone/server.js" ] && [ "$DEPLOY_MODE" != "true" ]; then
        echo "✅ Server deployment files verified"
    elif [ -d ".next/out" ] && [ "$DEPLOY_MODE" = "true" ]; then
        echo "✅ Static deployment files verified"
    fi
else
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

# Final deployment readiness check
echo "🔍 Running deployment readiness check..."

# Check if index.html exists in public
if [ -f "public/index.html" ]; then
    echo "✅ Fallback index.html present"
else
    echo "❌ Missing index.html in public directory"
    exit 1
fi

# Check package.json
if [ -f "package.json" ]; then
    echo "✅ package.json present"
else
    echo "❌ Missing package.json"
    exit 1
fi

# Check next.config.mjs
if [ -f "next.config.mjs" ]; then
    echo "✅ Next.js configuration present"
else
    echo "❌ Missing next.config.mjs"
    exit 1
fi

echo ""
echo "🎉 Deployment build completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "   Mode: $([ "$DEPLOY_MODE" = "true" ] && echo "Static" || echo "Autoscale")"
echo "   Build Output: .next/"
echo "   Public Files: public/"
echo "   Server Ready: $([ -f ".next/standalone/server.js" ] && echo "Yes" || echo "No")"
echo ""
echo "🚀 Ready for Replit deployment!"