import { defineConfig } from "vite";

// Vite config tuned for Tauri desktop builds.
export default defineConfig({
  // Prevent Vite from obscuring Rust errors
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  // Produce a relative-path build so Tauri can load it from the bundled app
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2021",
  },
});
