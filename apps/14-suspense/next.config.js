//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js options go here
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js
  distDir: '../../dist/apps/14-suspense',
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
  },
  async redirects() {
    return [
      {
        source: '/expenses/variation',
        destination: '/expenses',
        permanent: false,
      },
      {
        source: '/employees/:id',
        destination: '/e_:id',
        permanent: false,
      },
      {
        source: '/employees/:id/edit',
        destination: '/e_:id/edit',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/e_:employeeId',
          destination: '/employees/:employeeId',
        },
        {
          source: '/e_:employeeId/edit',
          destination: '/employees/:employeeId/edit',
        },
        {
          source: '/expenses',
          has: [
            {
              type: 'cookie',
              key: 'abtest',
              value: 'true',
            },
          ],
          destination: '/expenses/variation',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

module.exports = nextConfig;
