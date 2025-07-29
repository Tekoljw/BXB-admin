#!/bin/bash

# BeDAO Platform - Comprehensive Build and Deployment Script
# Supports both Autoscale and Static deployment types for Replit

set -e  # Exit on any error

echo "🚀 BeDAO Platform - Build and Deployment Script"
echo "=============================================="

# Configuration
DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE:-"autoscale"}
NODE_ENV=${NODE_ENV:-"production"}

echo "📋 Configuration:"
echo "   Deployment Type: $DEPLOYMENT_TYPE"
echo "   Node Environment: $NODE_ENV"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build based on deployment type
if [ "$DEPLOYMENT_TYPE" = "static" ]; then
    echo "🏗️  Building for Static Deployment..."
    echo "   - Configuring Next.js for static export"
    echo "   - Generating static files in 'out' directory"
    
    export DEPLOYMENT_TYPE=static
    npm run build
    
    # Verify static build
    if [ -d "out" ]; then
        echo "✅ Static build completed successfully"
        echo "   - Output directory: out/"
        echo "   - Files generated: $(find out -type f | wc -l) files"
        echo "   - Build size: $(du -sh out | cut -f1)"
        
        # Copy index.html to root of out directory if it doesn't exist
        if [ ! -f "out/index.html" ] && [ -f "public/index.html" ]; then
            cp public/index.html out/index.html
            echo "   - Copied fallback index.html to output directory"
        fi
    else
        echo "❌ Static build failed - no output directory created"
        exit 1
    fi
    
else
    echo "🏗️  Building for Autoscale Deployment (Recommended)..."
    echo "   - Configuring Next.js for server-side rendering"
    echo "   - Generating standalone server build"
    
    npm run build
    
    # Verify autoscale build
    if [ -d ".next" ]; then
        echo "✅ Autoscale build completed successfully"
        echo "   - Output directory: .next/"
        echo "   - Build type: $([ -d ".next/standalone" ] && echo "Standalone Server" || echo "Standard Build")"
        echo "   - Build size: $(du -sh .next | cut -f1)"
    else
        echo "❌ Autoscale build failed - no .next directory created"
        exit 1
    fi
fi

# Deployment verification
echo ""
echo "🔍 Deployment Verification:"

# Check for required files
if [ "$DEPLOYMENT_TYPE" = "static" ]; then
    if [ -f "out/index.html" ]; then
        echo "✅ Index.html file exists in output directory"
    else
        echo "⚠️  Warning: No index.html in output directory"
    fi
    
    if [ -d "out/_next" ]; then
        echo "✅ Next.js static assets generated"
    else
        echo "⚠️  Warning: Missing Next.js static assets"
    fi
else
    if [ -f "public/index.html" ]; then
        echo "✅ Fallback index.html exists in public directory"
    else
        echo "⚠️  Warning: No fallback index.html for static requests"
    fi
    
    if [ -f ".next/BUILD_ID" ]; then
        echo "✅ Next.js build completed with ID: $(cat .next/BUILD_ID)"
    else
        echo "⚠️  Warning: No build ID generated"
    fi
fi

# Check configuration files
if [ -f "replit.toml" ]; then
    echo "✅ Replit deployment configuration exists"
else
    echo "⚠️  Warning: No replit.toml configuration file"
fi

if [ -f "next.config.mjs" ]; then
    echo "✅ Next.js configuration exists"
else
    echo "❌ Error: Missing next.config.mjs"
    exit 1
fi

# Final deployment readiness check
echo ""
echo "🎯 Deployment Readiness Summary:"
echo "================================"

if [ "$DEPLOYMENT_TYPE" = "static" ]; then
    if [ -d "out" ] && [ -f "out/index.html" ]; then
        echo "✅ READY FOR STATIC DEPLOYMENT"
        echo "   - Use 'Static' deployment type in Replit"
        echo "   - Public directory: out/"
        echo "   - All static files generated successfully"
    else
        echo "❌ NOT READY - Static build incomplete"
        exit 1
    fi
else
    if [ -d ".next" ] && [ -f "public/index.html" ]; then
        echo "✅ READY FOR AUTOSCALE DEPLOYMENT (RECOMMENDED)"
        echo "   - Use 'Autoscale' deployment type in Replit"
        echo "   - Server build with fallback support"
        echo "   - Optimal for Next.js applications"
    else
        echo "❌ NOT READY - Autoscale build incomplete"
        exit 1
    fi
fi

echo ""
echo "🎉 Build process completed successfully!"
echo "   You can now deploy using Replit's deployment interface."