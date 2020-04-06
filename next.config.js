require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const path = require("path");
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config, options) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.alias.components = path.join(__dirname, "./src/components");
    config.resolve.alias.utils = path.join(__dirname, "./src/utils");
    config.resolve.alias.middlewares = path.join(
      __dirname,
      "./src/middlewares"
    );
    config.resolve.alias.models = path.join(__dirname, "./src/models");

    config.node = {
      fs: "empty",
    };

    return config;
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000 * 3,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
};

const exportByEnv =
  process.env.NODE_ENV === "development"
    ? withPlugins(
        [[withImages, { exclude: path.resolve(__dirname, "src/assets/svg") }]],
        nextConfig
      )
    : withPlugins(
        [
          [withPWA, { pwa: { dest: "public" } }],
          [withImages, { exclude: path.resolve(__dirname, "src/assets/svg") }],
        ],
        nextConfig
      );

module.exports = exportByEnv;
