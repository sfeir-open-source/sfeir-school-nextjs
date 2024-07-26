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

console.log(nextConfig.images?.remotePatterns);

export default nextConfig;
