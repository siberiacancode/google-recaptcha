import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
  plugins: [
    dts({
      afterBuild: () => {
        copyFileSync('dist/types/index.d.ts', 'dist/types/index.d.mts');
      },
      entryRoot: 'src',
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: pkg.name,
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts')
      },
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs'
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named'
        }
      ]
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
});
