#!/bin/bash
echo "🚀 Starting BXB deployment process..."

# Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules .next pnpm-lock.yaml package-lock.json

# Install dependencies with legacy peer deps to bypass React 19 conflicts
echo "📦 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps --force

# Verify critical packages are installed
echo "🔍 Verifying installations..."
if [ ! -d "node_modules/react" ]; then
    echo "❌ React installation failed"
    exit 1
fi

if [ ! -d "node_modules/next" ]; then
    echo "❌ Next.js installation failed"
    exit 1
fi

# Build the application
echo "🔨 Building application for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    
    # List build output
    echo "📊 Build output:"
    ls -la .next/
    
    # Check for standalone build
    if [ -d ".next/standalone" ]; then
        echo "✅ Standalone build created successfully"
    else
        echo "⚠️  Standalone build not found, but build completed"
    fi
    
else
    echo "❌ Build failed. Check the logs above for errors."
    exit 1
fi

echo "🎉 Deployment preparation complete!"