/** @type {import('next').NextConfig} */
const nextConfig = {};


// next.config.js
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load and expand environment variables
const env = dotenv.config();
dotenvExpand.expand(env);

export default {
  // Other Next.js configuration options
  env: {
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  },
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
};

