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
  output: 'standalone', // Required for Replit Autoscale deployment - DO NOT CHANGE TO 'export'
  
  // Cross-origin configuration for Replit
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Server configuration for Replit
  experimental: {
    serverActions: {
      allowedOrigins: ['*.replit.dev', '*.replit.app', 'localhost:5000']
    }
  },
  
  // Additional configuration for stable deployment
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  
  // Webpack configuration to handle CSS issues
  webpack: (config, { dev, isServer }) => {
    // Disable CSS optimization in production builds
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
}

export default nextConfig