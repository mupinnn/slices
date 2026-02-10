// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mupinnn.github.io",
  base: "/slices/order-summary-card",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
});
