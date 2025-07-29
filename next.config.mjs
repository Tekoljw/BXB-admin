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
  
  // Replit deployment configuration - Autoscale mode (preferred for Next.js)
  serverExternalPackages: ['@neondatabase/serverless'],
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : 'standalone',
  
  // Deployment target configuration
  distDir: '.next',
  trailingSlash: process.env.STATIC_EXPORT === 'true',
  
  // Static export configuration for fallback deployment
  ...(process.env.STATIC_EXPORT === 'true' && {
    assetPrefix: '',
    basePath: '',
    generateBuildId: () => 'build',
  }),
  
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
  
  // Development configuration for cross-origin requests
  allowedDevOrigins: [
    '*.replit.dev',
    '*.replit.app', 
    'localhost:5000',
    '127.0.0.1:5000'
  ],
  
  // Additional configuration for stable deployment
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  
  // Webpack configuration to handle CSS issues and chunk loading
  webpack: (config, { dev, isServer }) => {
    // Disable CSS optimization in production builds
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    
    // Fix for missing module chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    };
    
    return config;
  },
}

export default nextConfig