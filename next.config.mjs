/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "twjz8b3iqxzhwarf.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
