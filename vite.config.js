import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({
  server: { allowedHosts: ["terminal.local"] },
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        aegised: resolve("projects/aegised.html"),
        evalforge: resolve("projects/evalforge.html"),
        gridflex: resolve("projects/grid-flex.html"),
        routeguard: resolve("projects/routeguard.html"),
      },
    },
  },
});
