import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

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
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  plugins: [react()],
});
