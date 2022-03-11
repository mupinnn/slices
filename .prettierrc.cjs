/**
 * @type {import("prettier").Options}
 */
module.exports = {
  printWidth: 100,
  arrowParens: "avoid",
  tabWidth: 2,
  endOfLine: "lf",
  quoteProps: "preserve",
  trailingComma: "es5",
  overrides: [
    {
      files: "src/**/*.scss",
      options: {
        singleQuote: true,
      },
    },
    {
      files: "**/*.{yml,yaml}",
      options: {
        singleQuote: true,
      },
    },
  ],
};
