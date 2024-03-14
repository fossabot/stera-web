/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins";
import withSerwistInit from "@serwist/next";
      
const withSerwist = withSerwistInit({
    // Note: This is only an example. If you use Pages Router,
    // use something else that works, such as "service-worker/index.ts".
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
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

export default withPlugins([withSerwist], nextConfig);

// // @ts-check
// import withSerwistInit from "@serwist/next";

// const withSerwist = withSerwistInit({
//   cacheOnFrontEndNav: true,
//   swSrc: "src/sw.ts", // add the path where you create sw.ts
//   swDest: "public/sw.js",
//   reloadOnOnline: true,
//   disable: process.env.NODE_ENV === "development", // to disable pwa in development
//   // ... other options
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   swcMinify: true,
//   reactStrictMode: true,
//   // ... other next.js config options
// };

// export default withSerwist(nextConfig);