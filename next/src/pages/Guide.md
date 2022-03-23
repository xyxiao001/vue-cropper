# 快速开始

### 安装
```shell
  # npm 安装

  # vue2.x版本
  npm install vue-cropper -d --save

  # vue3.x版本
  npm install vue-cropper@next -d --save
```

```shell
  # yarn 安装

  # vue2.x版本
  yarn add vue-cropper

  # vue3.x版本
  yarn add vue-cropper@next
```

#### 如果你没有使用 `npm`, 参考下面👇🏻例子

[在线例子vue-cropper + vue.2x](https://codepen.io/xyxiao001/pen/wxwKGz)

[在线例子vue-cropper@next + vue.3x](https://codepen.io/xyxiao001/pen/yLooYKg)

服务器渲染 `nuxt` 解决方案 设置为 `ssr: false`
```js
module.exports = {
  ...
  build: {
    vendor: [
      'vue-cropper
    ...
    plugins: [
      { src: '~/plugins/vue-cropper', ssr: false }
    ]
  }
}
```

### 使用
`Vue 3` 组件内引入
```bash
npm install vue-cropper@next
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";
```

`Vue3` 全局引入
```js
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

const app = createApp(App)
app.use(VueCropper)
app.mount('#app')
```

`Vue3 CDN` 方式引入
```html
<style type="text/css" src="https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/index.css"></style> 
```

```js
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.1/dist/vue.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/vue-cropper.umd.js"></script>
const app = Vue.createApp({...});
app.component('vue-cropper', window['vue-cropper'].VueCropper);
```


`Vue2` 组件内引入
```js
import { VueCropper }  from 'vue-cropper' 
components: {
  VueCropper
}
```

`Vue2` 全局引入
```js
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
```


`Vue2 CDN` 方式引入
```html
<script src="//cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.js"></script>
```
```js
Vue.use(window['vue-cropper'].default)
```


`nuxt` 引入方式
```js
if(process.browser) {
  vueCropper = require('vue-cropper')
  Vue.use(vueCropper.default)
}
```