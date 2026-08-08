//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js options go here
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js
  distDir: '../../dist/apps/10-expected-errors',
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
  },
};

module.exports = nextConfig;
