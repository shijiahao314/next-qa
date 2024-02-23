/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: false,
  // 解决跨域问题
  async rewrites() {
    return [
      {
        source: '/api/auth/login',
        destination: `http://123.56.65.40:8080/api/auth/login`
      },
      {
        source: '/api/auth/logout',
        destination: `http://123.56.65.40:8080/api/auth/logout`
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
