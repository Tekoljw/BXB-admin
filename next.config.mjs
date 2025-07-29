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
  
  // Replit Autoscale deployment configuration (OPTIMIZED FOR REPLIT DEPLOYMENT)
  output: 'standalone',
  serverExternalPackages: ['@neondatabase/serverless'],
  
  // Static file optimization
  distDir: '.next',
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  
  // Cross-origin and security headers for Replit
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Server configuration for Replit deployment
  experimental: {
    serverActions: {
      allowedOrigins: ['*.replit.dev', '*.replit.app', 'localhost:5000']
    }
  },
  
  // Development configuration for cross-origin requests
  allowedDevOrigins: [
    '*.replit.dev',
    '*.replit.app', 
    'localhost:5000',
    '127.0.0.1:5000'
  ],
  
  // Simplified Webpack configuration to avoid build errors
  webpack: (config, { dev, isServer }) => {
    // Completely disable minimization for client-side builds to avoid CSS errors
    if (!dev && !isServer) {
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }
    
    return config;
  },
  
  // Redirect configuration for fallback
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

export default nextConfig