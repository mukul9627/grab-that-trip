/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gtt.dbbworldwide.com",
        port: "",
        pathname: "/Images/**", // allow all images under /Images/
      },
    ],
  },
};

module.exports = nextConfig;
