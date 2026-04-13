import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CoHost-Management-Website",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
