import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
  plugins: [
    react(),
    dts({
      afterBuild: () => {
        copyFileSync('dist/types/index.d.ts', 'dist/types/index.d.mts');
      },
      exclude: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
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
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'react/jsx-runtime'
      ],
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
