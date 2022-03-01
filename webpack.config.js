const { devConfig, prodConfig } = require("./config/webpack");

module.exports = (_, args) => {
  switch (args.mode) {
    case "development":
      return devConfig;
    case "production":
      return prodConfig;
    default:
      throw new Error(`No matching configuration for the specified mode: ${args.mode}`);
  }
};
