const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("../paths");

module.exports = {
  target: ["web", "es5"],
  entry: paths.src + "/index.js",
  output: {
    path: paths.build,
    filename: "[name].js",
    assetModuleFilename: "[name][ext][query]",
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
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.src + "/index.html",
      filename: "index.html",
    }),
  ],
};
