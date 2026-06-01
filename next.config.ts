import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // 关键：路径统一加/，避免404 & 样式路径错
};

export default nextConfig;
