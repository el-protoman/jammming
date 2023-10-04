/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV: process.env.DEV,
  },
}

module.exports = nextConfig
