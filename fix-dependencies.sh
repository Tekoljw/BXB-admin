#!/bin/bash

echo "Fixing React dependency conflicts for deployment..."

# Add REPLIT_DISABLE_PACKAGE_LAYER environment variable
export REPLIT_DISABLE_PACKAGE_LAYER=1

# Create .npmrc file with legacy peer deps
echo "legacy-peer-deps=true" > .npmrc
echo "audit-level=none" >> .npmrc
echo "fund=false" >> .npmrc

# Update react-day-picker to latest version
npm install react-day-picker@^9.8.1 --legacy-peer-deps

# Also try to update vaul to a React 19 compatible version
npm install vaul@^1.0.0 --legacy-peer-deps || npm install vaul@latest --legacy-peer-deps

echo "Dependencies updated with legacy peer deps support"
echo "Build should now work with React 19"