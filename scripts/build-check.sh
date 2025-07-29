#!/bin/bash

echo "🚀 BeDAO Platform - Deployment Build Check"
echo "=========================================="

# Set environment variables for production
export NODE_ENV=production

echo "📋 Environment Check:"
echo "- Node.js version: $(node --version)"
echo "- npm version: $(npm --version)"
echo "- NODE_ENV: $NODE_ENV"
echo ""

echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
echo "✅ Clean completed"
echo ""

echo "🔨 Running production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "📊 Build Analysis:"

# Check .next directory
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    echo "✅ .next directory exists (size: $BUILD_SIZE)"
    
    # Check for essential files
    if [ -f ".next/standalone/server.js" ]; then
        echo "✅ Standalone server.js found"
    else
        echo "⚠️  Standalone server.js not found"
    fi
    
    if [ -d ".next/static" ]; then
        echo "✅ Static assets directory found"
    else
        echo "⚠️  Static assets directory not found"
    fi
else
    echo "❌ .next directory not found!"
    exit 1
fi

# Check public directory
if [ -d "public" ]; then
    echo "✅ Public directory exists"
    if [ -f "public/index.html" ]; then
        echo "✅ Fallback index.html found"
    else
        echo "⚠️  Fallback index.html not found"
    fi
else
    echo "❌ Public directory not found!"
fi

echo ""
echo "🎯 Deployment Readiness:"
echo "✅ Build Type: Autoscale (Next.js Standalone)"
echo "✅ Output Directory: .next"
echo "✅ Start Command: npm start"
echo "✅ Health Check: / (root path)"
echo ""

echo "🔗 Next Steps:"
echo "1. Ensure secrets are configured in Replit environment"
echo "2. Deploy using Replit's Deploy button"
echo "3. Select 'Autoscale' deployment type"
echo "4. The application will be available at your .replit.app domain"

echo ""
echo "🏁 Build check completed successfully!"