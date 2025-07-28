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
  
  // Replit deployment configuration
  serverExternalPackages: ['@neondatabase/serverless'],
  
  // Cross-origin configuration for Replit
  allowedDevOrigins: [
    '*.replit.dev',
    '*.replit.app',
    'localhost:5000',
    '127.0.0.1:5000'
  ],
  
  // Webpack configuration to handle CSS issues
  webpack: (config, { dev, isServer }) => {
    // Fix CSS handling issues
    if (!dev && !isServer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (minimizer) => !minimizer.constructor.name.includes('CssMinimizerPlugin')
      );
    }
    return config;
  },
}

export default nextConfig