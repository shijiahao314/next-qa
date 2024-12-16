module.exports = {
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