/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REST_API_KEY: process.env.REST_API_KEY,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
