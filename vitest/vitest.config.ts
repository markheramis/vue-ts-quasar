/// <reference types="vitest" />

import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  mode: 'test',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest', 'pinia'],
      dts: './vitest/vitest-auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      app: path.join(__dirname, '..'),
      src: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components'),
      css: path.join(__dirname, '../css'),
      layouts: path.join(__dirname, '../src/layouts'),
      pages: path.join(__dirname, '../src/pages'),
      router: path.join(__dirname, '../src/router'),
      stores: path.join(__dirname, '../src/stores'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude],
  },
})
