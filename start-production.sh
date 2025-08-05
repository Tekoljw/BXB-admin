#!/bin/bash

# BeDAO-ho Production Server Start Script
echo "🚀 Starting BeDAO-ho production server..."

# Set production environment variables
export NODE_ENV=production
export HOSTNAME=0.0.0.0
export PORT=5000

# Navigate to standalone directory and start server
cd .next/standalone && exec node server.js