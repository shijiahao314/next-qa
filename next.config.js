/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permanent: true
      }
    ];
  }
};

module.exports = withMDX(nextConfig);
