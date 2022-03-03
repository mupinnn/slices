const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fg = require("fast-glob");
const paths = require("../config/paths");
const { changeExtension } = require("./helpers");

function generateEntries() {
  const entryFiles = fg.sync("**/entry.js", {
    cwd: "src/pages",
    deep: 2,

    // exclude `pages/entry.js` or any files that directly lives in `pages` dir
    ignore: ["./*.*"],
  });

  const entries = {};
  entryFiles.forEach(entry => {
    const [dir, _] = entry.split("/");
    entries[dir] = `${paths.src}/pages/${entry}`;
  });

  return entries;
}

function generateHTMLEntries() {
  const templates = fg.sync("**/*.{html,pug}", {
    cwd: "src/pages",
    deep: 2,
  });

  return templates.map(template => {
    const [pageDir, pageName] = template.split("/");
    const pageExt = path.extname(pageName);
    let htmlPage = pageName;

    if ([".pug"].includes(pageExt)) {
      htmlPage = changeExtension(pageName, ".html");
    }

    return new HtmlWebpackPlugin({
      filename: pageDir === "home" ? htmlPage : `${pageDir}/${htmlPage}`,
      template: path.resolve(`${paths.src}/pages`, template),
      chunks: [pageDir],
    });
  });
}

/**
 * Preserve assets (images, fonts, etc) folder structure in the output folder
 * Reference: https://stackoverflow.com/a/68902490/7896147
 */
function generateAssetModulesOutput(pathData) {
  const webpackMode = process.argv
    .slice(2)
    .filter(arg => arg.includes("--mode"))[0]
    .split("=")[1];

  const filePath = path.dirname(pathData.filename).split("/").slice(2).join("/");

  if (webpackMode === "production") {
    return `${filePath}/[name].[contenthash][ext][query]`;
  }

  return `${filePath}/[name][ext][query]`;
}

module.exports = {
  generateEntries,
  generateHTMLEntries,
  generateAssetModulesOutput,
};