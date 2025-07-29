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
  
  // Replit deployment configuration - supports both Autoscale and Static deployment
  output: process.env.DEPLOYMENT_TYPE === 'static' ? 'export' : 'standalone',
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
  
  // Enhanced webpack configuration with CSS error handling
  webpack: (config, { dev, isServer }) => {
    // Basic fallback configuration for node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Fix CSS optimization errors by completely disabling CSS minification in production
    if (!dev) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => {
          const name = plugin.constructor.name;
          return !name.includes('CssMinimizerPlugin') && !name.includes('CssMinimizer');
        }
      );
      
      // Add better error handling for CSS processing
      config.ignoreWarnings = [
        /Failed to parse source map/,
        /Cannot read properties of undefined/,
        /css.*unable to parse/i,
      ];
      
      // Keep optimization for JS but disable for CSS
      config.optimization.minimize = true;
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