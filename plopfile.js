export default function (/** @type {import('plop').NodePlopApi} */ plop) {
  plop.setGenerator("page", {
    description: "Create new project for your next slices",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Project name:",
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template:",
        choices: ["astro"],
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "templates/{{template}}",
        templateFiles: "templates/{{template}}/**/*",
        destination: "slices/{{kebabCase name}}",
        globOptions: {
          dot: true,
          ignore: ["**/.astro/**", "**/.turbo/**", "**/dist/**", "**/node_modules/**"],
        },
      },
    ],
  });
}
