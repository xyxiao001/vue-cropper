# vue-cropper
一个优雅的图片裁剪插件

[ [查看演示 Demo](https://github.xyxiao.cn/vue-cropper/docs/vue3.html) ]  
[ [README_english](../english.md) ]  
[ [更新日志](../CHANGELOG.md) ]



## 一、安装使用


### 1. 安装

```bash
# npm 安装
npm install vue-cropper
```
```bash
# yarn 安装
yarn add vue-cropper
```


如果你没有使用 `npm`

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


### 2. 引入 Vue Cropper 
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

### 3. 代码中使用

> **重要！** 需要关掉本地的 mock 服务， 不然图片转化会报错
> **重要！** 需要使用外层容器包裹并设置宽高

```html
<vueCropper
  ref="cropper"
  :img="option.img"
  :outputSize="option.size"
  :outputType="option.outputType"
></vueCropper>
```


## 二、文档

### 1. props

> 目前还不知道什么原因项目里面开启 `mock` 会导致 file 报错，建议使用时关掉 `mock`


名称 | 功能 | 默认值 | 可选值
--- | --- | --- | ---
img | 裁剪图片的地址 | 空 | `url 地址`, `base64`, `blob`
outputSize | 裁剪生成图片的质量 | 1 | 0.1 ~ 1
img | 裁剪图片的地址 | 空 | `url 地址`, `base64`, `blob`
outputSize | 裁剪生成图片的质量 | `1` | 0.1 ~ 1
outputType | 裁剪生成图片的格式 | jpg (jpg 需要传入jpeg) | `jpeg`, `png`, `webp`
info | 裁剪框的大小信息 | `true` | `true`, `false`
canScale | 图片是否允许滚轮缩放 | `true` | `true`, `false`
autoCrop | 是否默认生成截图框 | `false` | `true`, `false`
autoCropWidth | 默认生成截图框宽度 | 容器的 80% | 0 ~ max
autoCropHeight | 默认生成截图框高度 | 容器的 80% | 0 ~ max
fixed | 是否开启截图框宽高固定比例 | `true` | `true`, `false`
fixedNumber | 截图框的宽高比例 | `[1, 1]` | `[ 宽度 ,  高度 ]`
full | 是否输出原图比例的截图 | `false` | `true`, `false`
fixedBox | 固定截图框大小 | 不允许改变 | `false` | `true`, `false`
canMove | 上传图片是否可以移动 | `true` | `true`, `false`
canMoveBox | 截图框能否拖动 | `true` | `true`, `false`
original | 上传图片按照原始比例渲染 | `false` | `true`, `false`
centerBox | 截图框是否被限制在图片里面 | `false` | `true`, `false`
high | 是否按照设备的dpr 输出等比例图片 | `true` | `true`, `false`
infoTrue | true 为展示真实输出图片宽高 `false` 展示看到的截图框宽高 | false | `true`, `false`
maxImgSize | 限制图片最大宽度和高度 | `2000` | 0 ~ max
enlarge | 图片根据截图框输出比例倍数 | `1` | 0 ~ max(建议不要太大不然会卡死的呢)
mode | 图片默认渲染方式 | `contain` | `contain` , `cover`, `100px`, `100%` auto

### 2. 可用回调方法

- `@realTime` 实时预览事件
- `@imgMoving`  图片移动回调函数
- `@cropMoving` 截图框移动回调函数
- `@imgLoad`  图片加载的回调, 返回结果 `success`,  `error`

#### @realTime 实时预览事件
```js
realTime(data) {
  var previews = data
  var h = 0.5
  var w = 0.2

  this.previewStyle1 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: h
  }

  this.previewStyle2 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: w
  }

  // 固定为 100 宽度
  this.previewStyle3 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: 100 / preview.w
  }

  // 固定为 100 高度
  this.previewStyle4 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: 100 / preview.h
  }
  this.previews = data
}
```

```html
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="option.img" :style="previews.img">
  </div>
</div>
<p>中等大小</p>
<div :style="previewStyle1"> 
  <div :style="previews.div">
    <img :src="previews.url" :style="previews.img">
  </div>
</div>

<p>迷你大小</p>
<div :style="previewStyle2"> 
  <div :style="previews.div">
    <img :src="previews.url" :style="previews.img">
  </div>
</div>
```


#### @imgMoving 图片移动回调函数

返回的参数内容
```js
{
   moving: true, // moving 是否在移动
   axis: {
     x1: 1, // 左上角
     x2: 1，// 右上角
     y1: 1，// 左下角
     y2: 1 // 右下角
   }
 }
```

#### @cropMoving 截图框移动回调函数
返回的参数内容
```js
{
   moving: true, // moving 是否在移动
   axis: {
     x1: 1, // 左上角
     x2: 1，// 右上角
     y1: 1，// 左下角
     y2: 1 // 右下角
   }
 }
```


### 2. 内置方法 和 属性
通过 `this.$refs.cropper` 调用

**属性**

属性 | 说明
--- | ---
this.$refs.cropper.cropW |  截图框宽度
this.$refs.cropper.cropH | 截图框高度


**方法**

方法 | 说明
--- | ---
this.$refs.cropper.startCrop() | 开始截图
this.$refs.cropper.stopCrop() | 停止截图
this.$refs.cropper.clearCrop() | 清除截图
this.$refs.cropper.changeScale() | 修改图片大小 正数为变大 负数变小
this.$refs.cropper.getImgAxis() | 获取图片基于容器的坐标点
this.$refs.cropper.getCropAxis() | 获取截图框基于容器的坐标点
this.$refs.cropper.goAutoCrop | 自动生成截图框函数
this.$refs.cropper.rotateRight() | 向右边旋转90度
this.$refs.cropper.rotateLeft() | 向左边旋转90度

**获取截图内容**

获取截图的 base64 数据

```js
this.$refs.cropper.getCropData(data => {
  // do something
  console.log(data)  
})
```

获取截图的 blob 数据
```js
this.$refs.cropper.getCropBlob(data => {
  // do something
  console.log(data)  
})
```





## 三、相关文章参考
- [shn_ui - vue-cropper ](https://shnhz.github.io/shn-ui/#/component/vue-cropper) - 野宁新之助
- [vue全家桶开发管理后台—裁切图片](https://blog.csdn.net/qq_30632003/article/details/79639346)  - 麻球科技-菅双鹏
- [Vue-cropper 图片裁剪的基本原理](https://www.cnblogs.com/tugenhua0707/p/8859291.html) - 龙恩0707
- [关于昵称和头像的总结（模仿微信）](https://zhuanlan.zhihu.com/p/45746753)  - 秋晨光
- [vue-cropper-h5](https://github.com/2277419213/vue-cropper-h5)  - 居里栈栈

## 四、交流
有什么意见，或者 bug，或者想一起开发 `vue-cropper`， 或者想一起开发其他插件
![群号 857471950](https://user-images.githubusercontent.com/15681693/134663362-a6940a73-4692-4cc0-985f-109579057014.JPG)
