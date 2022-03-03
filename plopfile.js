module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("page", {
    description: "Create new page for your next slices",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Page/project name (lower-kebab-case):",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "templates/page",
        templateFiles: "templates/page/**/*",
        destination: "src/pages/{{name}}",
        globOptions: {
          dot: true,
        },
      },
    ],
  });
};
