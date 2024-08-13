// next.config.js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const env = dotenv.config();
dotenvExpand.expand(env);

const nextConfig = {
  // Add or remove experimental features based on current Next.js documentation
  experimental: {
    // Example of enabling React Server Components, if applicable
    reactRoot: true,
  },
  env: {
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
