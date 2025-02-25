/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.hotdoc.com.au',
      },
    ],
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.hotdoc.com.au",
          },
        ],
      },
      {
        source: '/booking',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://www.hotdoc.com.au/',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 