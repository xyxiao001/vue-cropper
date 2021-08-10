// vite.config.js
import vue from '@vitejs/plugin-vue'
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './lib/index.js'),
      name: 'vue-cropper',
      fileName: (format) => `vue-cropper.${format}.js`
    },
    // css不要拆分
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
  plugins: [vue()]
})