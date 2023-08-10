/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REST_API_KEY: process.env.REST_API_KEY,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
};

module.exports = nextConfig;
