/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.87.106.90.112.sslip.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "petzold-filebrowser.bidsvio.online",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
