/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚀 This is the line that helps
  },
};

module.exports = nextConfig;