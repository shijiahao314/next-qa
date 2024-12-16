import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
