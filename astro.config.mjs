import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || "https://thehull.github.io",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
