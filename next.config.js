/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

const nextConfig = withPWA({
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  reactStrictMode: true,

  images: {
    domains: [
      'granderby.io',
      'assets.coingecko.com',
      'alchemy.com',
      'nft-cdn.alchemy.com',
      'ipfs.io',
      'via.placeholder.com',
      'dshujxhbbpmz18304035.gcdn.ntruss.com',
      '6d0a3abfa7ad50324b419e1a4da4721c.ipfscdn.io',
      'randomuser.me',
      'res.cloudinary.com',
      'bafybeialqcg4le2irtqqqcp2ea7yvy3yrmtuyn6rbdyarl247lfl7x44ce.ipfs.cf-ipfs.com',
      '79125a56ef0c1629d4863b6df0a43cce.ipfscdn.io',
      'images.unsplash.com',
      'resource.nft.derbystars.com',
      'img.zed.run',
    ],
  },

  /*
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
  */

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
