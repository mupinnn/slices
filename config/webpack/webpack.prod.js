const { ProgressPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const commonConfig = require("./webpack.common");
const paths = require("../paths");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "[name].[contenthash][ext][query]",
  },
  module: {
    rules: [
      /**
       * CSS stuff.
       */
      {
        test: /\.s[ac]ss$/i,
        include: paths.src,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },

      /**
       * JS stuff
       * I only transpile JavaScript on build time
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
});
