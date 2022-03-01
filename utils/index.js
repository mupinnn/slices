const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fg = require("fast-glob");
const paths = require("../config/paths");
const { changeExtension } = require("./helpers");

function generateHTMLEntries() {
  const templates = fg.sync("**/*.{html,pug}", {
    cwd: "src/pages",
    deep: 2,
  });

  return templates.map(template => {
    const [pageDir, pageName] = template.split("/");
    const pageExt = path.extname(pageName);
    let htmlPage;

    if ([".pug"].includes(pageExt)) {
      htmlPage = changeExtension(pageName, ".html");
    }

    return new HtmlWebpackPlugin({
      filename: pageDir === "home" ? htmlPage : `${pageDir}/${htmlPage}`,
      template: path.resolve(`${paths.src}/pages`, template),
    });
  });
}

module.exports = {
  generateHTMLEntries,
};
