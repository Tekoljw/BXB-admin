/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Replit deployment configuration - Autoscale mode (NOT static)
  serverExternalPackages: ['@neondatabase/serverless'],
  output: 'standalone', // Required for Replit Autoscale deployment
  
  // Cross-origin configuration for Replit
  allowedDevOrigins: [
    '*.replit.dev',
    '*.replit.app', 
    'localhost:5000',
    '127.0.0.1:5000'
  ],
  
  // Server configuration for Replit
  experimental: {
    serverActions: {
      allowedOrigins: ['*.replit.dev', '*.replit.app']
    },
    // Disable CSS optimization to prevent build errors
    optimizeCss: false,
  },
}

export default nextConfig