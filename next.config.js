/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: false,
  // 解决跨域问题
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/:path*`
      }
    ];
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ];
  }
};

module.exports = withMDX(nextConfig);
