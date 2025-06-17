import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      exclude: ["**/*.stories.ts"],
      entryRoot: "src",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        "#imports",
      ],
      output: [
        {
          format: "es",
          dir: "dist",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
        },
      ],
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
