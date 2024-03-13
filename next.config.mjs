/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins";
import withPWA from "next-pwa";

const nextPWA = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  reactStrictMode: true,
};

export default nextPWA(nextConfig);
