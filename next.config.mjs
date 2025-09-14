/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://www.auktionshaus-rehm.de/",
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.petzold-auktionen.de;",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://www.petzold-auktionen.de",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
