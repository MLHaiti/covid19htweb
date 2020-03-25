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
    config.node = {
      fs: "empty",
    };

    return config;
  },
};

module.exports = withPlugins(
  [
    [withPWA, { pwa: { dest: "public" } }],
    [withImages, { exclude: path.resolve(__dirname, "src/assets/svg") }],
  ],
  nextConfig
);
