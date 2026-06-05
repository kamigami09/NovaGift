import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` for Nginx hosting.
  output: "export",

  // Emit `/route/index.html` so any static server (Nginx) resolves
  // clean URLs like /catalogue without extra rewrite rules.
  trailingSlash: true,

  // Static export can't use the default Image Optimization server.
  // Images are local files in /public, so serve them as-is.
  images: { unoptimized: true },

  // Don't advertise the framework in response headers.
  poweredByHeader: false,

  // NOTE: Security headers (HSTS, X-Frame-Options, etc.) are NOT supported
  // by `output: export` and are now set at the Nginx layer instead.
};

export default nextConfig;
