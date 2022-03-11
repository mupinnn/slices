import paths from "../paths.js";
import {
  generateEntries,
  generateHTMLEntries,
  generateAssetModulesOutput,
} from "../../utils/index.js";

const commonConfig = {
  target: ["web", "es5"],
  entry: generateEntries(),
  output: {
    path: paths.build,
    filename: "[name].js",
    assetModuleFilename: generateAssetModulesOutput,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.pug$/,
        loader: "@webdiscus/pug-loader",
      },
    ],
  },
  plugins: generateHTMLEntries().concat([
    // Another plugin here
  ]),
};

export default commonConfig;
