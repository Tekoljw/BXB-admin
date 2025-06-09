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
  // 关闭严格模式以提高性能
  reactStrictMode: false,
  // 预编译所有页面以减少首次访问延迟
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 10,
  },
  // 禁用开发工具和调试按钮
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // 禁用开发模式覆盖层
  devIndicators: {
    buildActivity: false,
  },
}

export default nextConfig