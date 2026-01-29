import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Enable standalone output for autoscale deployment
  output: 'standalone',
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
  
  // Output file tracing configuration
  outputFileTracingRoot: __dirname,
  
  // Experimental configuration
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
    '127.0.0.1:5000',
    '0.0.0.0:5000'
  ],
  
  // Webpack configuration for Replit deployment
  webpack: (config, { dev, isServer, webpack }) => {
    // Add proper fallbacks for browser environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        process: false,
      };
    }
    
    // Simplified webpack configuration for stable builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: false,
      };
      
      // Define global variables to prevent "self is not defined" errors
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'typeof self': JSON.stringify('undefined'),
          'typeof window': isServer ? JSON.stringify('undefined') : JSON.stringify('object'),
        })
      );
    }
    
    return config;
  },
  
  // API代理配置（解决开发环境跨域问题）
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // 如果配置了API基础URL，在开发环境使用代理
    if (process.env.NODE_ENV === 'development' && apiBaseUrl) {
      return [
        {
          source: '/api/proxy/:path*',
          destination: `${apiBaseUrl}/:path*`,
        },
      ];
    }
    
    return [];
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