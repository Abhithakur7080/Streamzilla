import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      plugins: [
        ["babel-plugin-transform-remove-console", { "exclude": ["error", "warn"] }]
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
