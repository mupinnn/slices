import { devConfig, prodConfig } from "./config/webpack/index.js";

export default (_, args) => {
  switch (args.mode) {
    case "development":
      return devConfig;
    case "production":
      return prodConfig;
    default:
      throw new Error(`No matching configuration for the specified mode: ${args.mode}`);
  }
};
