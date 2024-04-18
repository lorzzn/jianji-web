import react from "@vitejs/plugin-react"
import autoprefixer from "autoprefixer"
import { join } from "node:path"
import { visualizer } from "rollup-plugin-visualizer"
import tailwindcss from "tailwindcss"
import { ConfigEnv, PluginOption, defineConfig, normalizePath } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

const srcPath = normalizePath(join(__dirname, "src"))
const distPath = normalizePath(join(__dirname, "dist"))

const getExtraPlugins = (mode: ConfigEnv["command"]) => {
  switch (mode) {
    case "build":
      return [
        visualizer({
          template: "treemap",
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "analyse.html",
        }) as PluginOption,
        viteStaticCopy({
          targets: [
            {
              src: normalizePath(join(srcPath, "statics")),
              dest: distPath,
            },
          ],
        }),
      ]

    default:
      return []
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react({
      babel: {
        configFile: true,
      },
    }),
    ...getExtraPlugins(command),
  ],
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
  build: {
    outDir: distPath,
    minify: "terser",
    sourcemap: false,
    commonjsOptions: {},
    rollupOptions: {
      output: {
        assetFileNames: "assets/[ext]/index.[hash][extname]",
        chunkFileNames: "assets/chunks/index.[hash].js",
        entryFileNames: "assets/index.[hash].js",
      },
    },
  },
  esbuild: {
    // 使用 react 的 createElement 处理 jsx
    jsxInject: `import React from 'react'`,
  },
  server: {
    port: 5173,
    open: false,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  preview: {
    port: 5273,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
}))
