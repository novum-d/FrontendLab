import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  build: {
    // root (= ./src) から見た相対パスで指定
    outDir: "../public",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  plugins: [react()],
});
