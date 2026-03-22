/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for catching potential React issues
  swcMinify: true,       // Faster minification
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // example images
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all external images (only for dev, remove in production!)
      },
    ],
  },
};

module.exports = nextConfig;