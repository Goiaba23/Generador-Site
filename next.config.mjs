/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'saas-sites.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/site/:slug*',
        destination: '/api/site/:slug*',
      },
    ];
  },
};

export default nextConfig;
