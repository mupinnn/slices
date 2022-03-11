import webpack from "webpack";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import commonConfig from "./webpack.common.js";
import paths from "../paths.js";
import { generateAssetModulesOutput } from "../../utils/index.js";

const prodConfig = merge(commonConfig, {
  mode: "production",
  output: {
    clean: true,
    filename: pathData => {
      return pathData.chunk.name === "home"
        ? "[name].[contenthash].js"
        : "[name]/[name].[contenthash].js";
    },
    assetModuleFilename: generateAssetModulesOutput,
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
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: pathData => {
        return pathData.chunk.name === "home"
          ? "[name].[contenthash].css"
          : "[name]/[name].[contenthash].css";
      },
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
});

export default prodConfig;
