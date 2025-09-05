import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence workspace root inference warn due to unrelated lockfiles
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
