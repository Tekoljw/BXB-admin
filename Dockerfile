# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm@latest
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm build

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["pnpm", "start"]