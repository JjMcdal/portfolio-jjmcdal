// next.config.ts
import type { NextConfig } from "next";

// Basic security headers applied to every route
const securityHeaders = [
  // Stops browsers from guessing a file's type (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // The site never needs to be embedded in an iframe
  { key: "X-Frame-Options", value: "DENY" },
  // Send the full URL only to same-origin, and just the origin to other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off browser features the site doesn't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;