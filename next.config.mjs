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
  
  // Disable standalone output to avoid build issues
  // output: 'standalone',
  serverExternalPackages: ['@neondatabase/serverless'],
  
  // Static export configuration for static deployment
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Static file optimization
  distDir: '.next',
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  
  // Conditional headers based on deployment type
  async headers() {
    // Skip headers for static export to avoid build issues
    if (process.env.DEPLOYMENT_TYPE === 'static') {
      return [];
    }
    
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
  
  // Disable webpack optimizations to prevent CSS parsing errors
  webpack: (config, { dev, isServer }) => {
    // Only add basic fallbacks for node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Completely disable all optimization for maximum compatibility
    if (!dev) {
      config.optimization = {
        minimize: false,
        minimizer: [],
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
      
      // Ignore all webpack warnings and errors
      config.ignoreWarnings = [() => true];
    }
    
    return config;
  },
  
  // Conditional redirects based on deployment type
  async redirects() {
    // Skip redirects for static export to avoid build issues
    if (process.env.DEPLOYMENT_TYPE === 'static') {
      return [];
    }
    
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