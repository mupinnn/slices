const paths = require("../paths");
const { generateHTMLEntries, generateAssetModulesOutput } = require("../../utils");

module.exports = {
  target: ["web", "es5"],
  entry: paths.src + "/index.js",
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
