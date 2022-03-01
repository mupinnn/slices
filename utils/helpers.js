const path = require("path");

function changeExtension(file, extension) {
  const basename = path.basename(file, path.extname(file));
  return path.join(path.dirname(file), basename + extension);
}

module.exports = {
  changeExtension,
};
