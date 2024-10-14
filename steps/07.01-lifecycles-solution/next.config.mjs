const apiUrl = new URL(process.env.API_BASE_URL || 'http://localhost:3001');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/e_:employeeId',
          destination: '/employees/:employeeId',
        },
        {
          source: '/expenses',
          has: [
            {
              type: 'cookie',
              key: 'abtest-variation',
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
    ];
  },
};

export default nextConfig;
