import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// Custom plugin to defer CSS loading
function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(.*?)">/g,
        `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), asyncCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
