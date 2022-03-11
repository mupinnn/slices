import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import paths from "../paths.js";

const devConfig = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    open: true,
    port: 9090,

    /**
     * HMR only affect JS/CSS files.
     * Need to watch HTML files for changes to reload the dev server.
     */
    watchFiles: paths.src + "/**/*.{html,pug}",
  },
  module: {
    rules: [
      /**
       * CSS stuff.
       * Use `style-loader` for better development performance
       */
      {
        test: /\.s[ac]ss$/i,
        include: paths.src,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});

export default devConfig;
