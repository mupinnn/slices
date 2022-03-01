const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const paths = require("../paths");

module.exports = merge(commonConfig, {
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
    watchFiles: paths.src + "/**/*.html",
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
