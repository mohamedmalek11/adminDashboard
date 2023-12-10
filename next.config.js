/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');
const result = dotenv.config();

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
