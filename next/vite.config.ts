// vite.config.js
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')
import { defineConfig } from 'vite'
import markdown from 'vite-plugin-md';
const markdownRenderer = require('markdown-it')();
const mdConfig = require('./md.config.ts');
import hljs from 'highlight.js';

module.exports = defineConfig({
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, './lib/index.ts'),
  //     name: 'vue-cropper',
  //     fileName: (format) => `vue-cropper.${format}.js`
  //   },
  //   // css不要拆分
  //   cssCodeSplit: true,
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ['vue'],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: 'Vue'
  //       }
  //     }
  //   },
  // },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        xhtmlOut: true,
        highlight: (str: any, lang: any) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
            } catch (__) {
            }
          }
          return '<pre class="hljs"><code>' + markdownRenderer.utils.escapeHtml(str) + '</code></pre>';
        }
      },
      markdownItSetup(md) {
        mdConfig(md);
        // md.use(require('markdown-it-anchor'))
        // md.use(require('markdown-it-prism'))
      },
      wrapperClasses: 'markdown-body',
    }),
  ]
})