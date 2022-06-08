/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '../../.next',
  reactStrictMode: true,
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
