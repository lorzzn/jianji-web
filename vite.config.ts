import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    },
  },
  build: {
    outDir: join(__dirname, 'dist'),
    minify: 'terser',
    sourcemap: false,
    commonjsOptions: {},
  },
  // 配置 Babel
  esbuild: {
    // 启用 Babel 转换，使用 react 的 createElement 处理 jsx
    jsxInject: `import React from 'react'`,
  },
  server: {
    port: 5173,
    open: false,
    host: 'localhost',
  },
})
