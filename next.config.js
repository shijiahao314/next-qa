/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: false,
  // 解决跨域问题
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://123.56.65.40:8080/api/:path*`
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
      // {
      //   source: '/dashboard',
      //   destination: '/dashboard/main',
      //   permanent: true
      // }
    ];
  }
};

module.exports = withMDX(nextConfig);
