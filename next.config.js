/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'barrioenergy.com',
      },
    ],
  },
}

module.exports = nextConfig
