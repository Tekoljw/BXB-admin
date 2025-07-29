#!/bin/bash

# BeDAO Platform - Comprehensive Build and Deployment Script
# This script handles both Autoscale and Static deployment preparations

echo "🚀 BeDAO Platform - Build and Deployment Setup"
echo "=============================================="

# Check deployment type (default to autoscale)
DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE:-"autoscale"}
echo "📋 Deployment Type: $DEPLOYMENT_TYPE"

# Function to check dependencies
check_dependencies() {
    echo "🔍 Checking dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed"
        exit 1
    fi
    
    echo "✅ Dependencies verified"
}

# Function to clean previous builds
clean_build() {
    echo "🧹 Cleaning previous builds..."
    rm -rf .next
    rm -rf out
    echo "✅ Build directories cleaned"
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
}

# Function to verify database configuration
verify_database() {
    echo "🗄️ Verifying database configuration..."
    
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️ Warning: DATABASE_URL not set (may be handled by Replit deployment)"
    else
        echo "✅ Database URL configured"
    fi
    
    # Check if schema file exists
    if [ -f "shared/schema.ts" ]; then
        echo "✅ Database schema found"
    else
        echo "⚠️ Warning: Database schema not found"
    fi
}

# Function to build for autoscale deployment
build_autoscale() {
    echo "🏗️ Building for Autoscale deployment..."
    
    export DEPLOYMENT_TYPE=autoscale
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Autoscale build failed"
        exit 1
    fi
    
    # Verify build output
    if [ -d ".next" ] && [ -f ".next/standalone/server.js" ]; then
        echo "✅ Autoscale build completed successfully"
        echo "📁 Output: .next/standalone/ (server-side rendered)"
    else
        echo "❌ Autoscale build verification failed"
        exit 1
    fi
}

# Function to build for static deployment
build_static() {
    echo "🏗️ Building for Static deployment..."
    
    export DEPLOYMENT_TYPE=static
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Static build failed"
        exit 1
    fi
    
    # Verify build output
    if [ -d "out" ] && [ -f "out/index.html" ]; then
        echo "✅ Static build completed successfully"
        echo "📁 Output: out/ (static files)"
    else
        echo "❌ Static build verification failed"
        exit 1
    fi
}

# Function to verify build readiness
verify_build() {
    echo "🔍 Verifying build readiness..."
    
    case $DEPLOYMENT_TYPE in
        "static")
            if [ -d "out" ]; then
                FILE_COUNT=$(find out -type f | wc -l)
                echo "✅ Static build verified: $FILE_COUNT files generated"
                
                # Check for essential files
                if [ -f "out/index.html" ]; then
                    echo "✅ Main index.html found"
                fi
                
                if [ -f "out/_next/static/chunks/pages/_app.js" ]; then
                    echo "✅ App bundle found"
                fi
            else
                echo "❌ Static build output not found"
                exit 1
            fi
            ;;
        "autoscale"|*)
            if [ -d ".next" ]; then
                echo "✅ Autoscale build verified"
                
                if [ -f ".next/standalone/server.js" ]; then
                    echo "✅ Standalone server found"
                fi
                
                if [ -d ".next/static" ]; then
                    echo "✅ Static assets found"
                fi
            else
                echo "❌ Autoscale build output not found"
                exit 1
            fi
            ;;
    esac
}

# Function to create deployment summary
create_summary() {
    echo ""
    echo "📋 DEPLOYMENT SUMMARY"
    echo "===================="
    echo "Deployment Type: $DEPLOYMENT_TYPE"
    echo "Build Status: ✅ SUCCESS"
    echo "Timestamp: $(date)"
    
    case $DEPLOYMENT_TYPE in
        "static")
            echo "Output Directory: out/"
            echo "Server Type: Static File Serving"
            echo "Features: Client-side rendering only"
            echo "Public Directory: public/ (fallback index.html available)"
            ;;
        "autoscale"|*)
            echo "Output Directory: .next/"
            echo "Server Type: Next.js Standalone Server"
            echo "Features: SSR, API routes, full Next.js functionality"
            echo "Public Directory: public/"
            ;;
    esac
    
    echo ""
    echo "🎉 Build completed successfully! Ready for Replit deployment."
    echo ""
}

# Main execution
main() {
    check_dependencies
    clean_build
    install_dependencies
    verify_database
    
    case $DEPLOYMENT_TYPE in
        "static")
            build_static
            ;;
        "autoscale"|*)
            build_autoscale
            ;;
    esac
    
    verify_build
    create_summary
}

# Execute main function
main "$@"