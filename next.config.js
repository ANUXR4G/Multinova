/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ogl","postprocessing"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/storage.magicpath.ai/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
