const apiUrl = new URL(process.env.API_BASE_URL);

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
};

export default nextConfig;
