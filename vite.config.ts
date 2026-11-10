import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// A relative base lets the build work at https://tffm-module.github.io/tffm-plus.github.io/
// (a project page under the tffm-module org) as well as on a custom domain.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
