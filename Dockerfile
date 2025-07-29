# Use Node.js 20 Alpine for optimal performance
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 5000 (required for Replit)
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "start"]