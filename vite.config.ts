import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: true,
      }
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss()
      ],
    },
  },
  build: {
    outDir: join(__dirname, 'dist'),
    minify: 'terser',
    sourcemap: false,
    commonjsOptions: {},
  },
  esbuild: {
    // 使用 react 的 createElement 处理 jsx
    jsxInject: `import React from 'react'`,
  },
  server: {
    port: 5173,
    open: false,
    host: 'localhost',
  },
})
