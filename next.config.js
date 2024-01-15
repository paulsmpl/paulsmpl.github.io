/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
  },
};

module.exports = nextConfig;
