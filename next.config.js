/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: false,
  // // 解决跨域问题
  // async rewrites() {
  //   return [
  //     {
  //       source: process.env.NEXT_PUBLIC_BACKEND_API_URL + '/:path*',
  //       destination: `http://127.0.0.1:8080/api/:path*`
  //     }
  //   ];
  // },
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
