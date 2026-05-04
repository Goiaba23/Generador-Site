/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'saas-sites.com'],
  },
  async rewrites() {
    return [
      // Rewrite for subdomain-based site preview/serving
      {
        source: '/site/:slug*',
        destination: '/api/site/:slug*',
      },
    ];
  },
};

export default nextConfig;
