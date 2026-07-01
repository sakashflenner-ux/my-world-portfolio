import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/my-world-portfolio" : "",
  assetPrefix: isGitHubPages ? "/my-world-portfolio/" : "",
};

export default nextConfig;
