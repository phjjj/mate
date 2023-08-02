/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REST_API_KEY: process.env.REST_API_KEY,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
