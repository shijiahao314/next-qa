/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  // 解决跨域问题
  async rewrites() {
    return [{
      source: '/api/:path*',
      destination: `http://10.112.188.168:8080/api/:path*`
    }];
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/main',
        permanent: true
      }
    ];
  }
};

module.exports = withMDX(nextConfig);
