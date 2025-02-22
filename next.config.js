/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Caching configuration
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },
  
  // Output configuration
  output: 'standalone',
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    optimizePackageImports: ['framer-motion', '@radix-ui/react-icons'],
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    scrollRestoration: true,
    workerThreads: true,
    optimisticClientCache: true,
  },
  
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Production optimizations
    if (!dev) {
      // Enable terser minification
      config.optimization.minimize = true;
      
      // Configure chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendors',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }

      // Configure caching
      config.cache = {
        type: 'filesystem',
        version: `${process.env.NODE_ENV}-${process.version}`,
        cacheDirectory: require('path').resolve(__dirname, '.next/cache/webpack'),
        store: 'pack',
        buildDependencies: {
          config: [__filename],
        },
      }
    }

    return config
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig; 