# 更新日志
## vue3.x组件更新日志
### v1.1.1
修复部分 base64 图片长度导致展示问题


### v1.1.0
- 修复 exif 读取图片出错的情况
- 新增 @imgLoadError方法返回对应错误
### v1.0.9
- 新增 fillCover, 导出图片背景颜色
### v1.0.8
- 更新特定情况固定比例问题
### v1.0.7
- 移除 node 版本和 npm 要求

### v1.0.6
- 添加最小截图框限制
- 修复 ts 类型问题
- 编译替换为 vite4.x
### v1.0.5
- vue3版本生命周期修复 unmounted
### v1.0.4
- 升级最新版本 vue 依赖和 vite 版本问题，解决 ts 类型引入问题
### v1.0.3
- 升级最新版本 vue 依赖和 vite 版本问题
### v1.0.2
- 提供 ts .d.ts 类型声明文件
- 修复 vue3 全局使用问题
### v1.0.1
- 修复固定角度的部分问题
### v1.0.1
- 修复依赖问题

### v1.0.0
- 支持 `vue3` 版本

## vue2.x组件更新日志
### v0.6.4
修复部分 base64 图片长度导致展示问题
### v0.6.3
- 修复 exif 读取图片出错的情况
- 新增 @imgLoadError方法返回对应错误
### v0.6.2
- 新增 fillCover, 导出图片背景颜色
### v0.6.1
- 修复部分问题
### v0.6.0
- 移除 node 版本和 npm 要求
### v0.59
- 添加最小截图框限制
### v0.58
- 更新 sass依赖
### v0.57
- 更新文档
### v0.56
- 修复绑定事件判断出错的问题
- 修复组件移除没有解绑滚动事件的问题

### v0.55
- 修复 ios 版本小于 13.4没有处理图片旋转的 bug

### v0.54
- 去除 log 信息
- 修复 pc safari低版本问题

### v0.53
- 因为 chrome81 内核版本和 ios13.5 版本修复了图片旋转的 bug
- 插件在新版浏览器默认不处理旋转了，低版本浏览器自动处理
- https://www.chromestatus.com/feature/6313474512650240

### v0.52
- 撤回最小弹框属性, 存在弹框拖拽坐标判断的 bug

### v0.51
- 更新裁剪框最小属性，限制最小区域，可传1以上的数字和字符串，限制长宽都是这么大 也可以传数组 [90,90]
- `limitMinSize:  [Number, Array, String]`

### v0.50
- 支持图片清空
- 修复 ie11 ie10 不能使用问题
- 修复 `URL.createObjectURL` 创建后没有销毁的 bug
- 添加截图框修改触发事件
    ```js
    this.$emit('change-crop-size', {
      width: this.cropW,
      height: this.cropH
    })
    ```


### v0.49
- 修复滚轮默认事件问题
- 修复html静态文件引入事件触发问题

### v0.48
- 修复mode 属性 contain 和cover的显示bug问题
- 修复ios 下面base64图片跨域显示问题

### v0.47
- 修复第一次不触发预览的问题
- 新增加图片渲染 mode 功能

### v0.46
- 修复图片旋转 bug
- 修复显示的一些 bug

### v0.45
- 添加倍数使用 enlarge
- 可以输出裁剪框等比例图片
- 感谢来自于 [hzsrc](https://github.com/hzsrc) 的贡献
- 添加预览框各种比例, 和修复图片截图小数问题

### v0.44
- 修复引入方式的问题
- 组件内使用
    ```js
    import { VueCropper }  from vue-cropper 
    components: {
      VueCropper,
    }
    ```

- main.js里面使用
  ```js
  import VueCropper from vue-cropper 
  Vue.use(vueCropper)
  ```

- CDN 方式使用
  ```js
  <script src="vuecropper.js"></script>
  Vue.use(window['vue-cropper'])
  ```
### v0.43
- 剥离 `exif` 的依赖库, 添加 `exfi-min.js` 减小代码体积  45.9k => 37k
- `build` 升级 `webpack4` 升级
- 添加 `vue install` 方法
    - `npm`: Vue.use(VueCropper)
    - `web`: Vue.use(window['vue-cropper'])

### v0.42
- 修复截图框因为去除小数点的引起的问题

### v0.41
- 修复截图框边界问题

### v0.40
- 修复 orientation 的处理方式
- 感谢 [Felipe Mengatto](https://github.com/felipemengatto) 的贡献

### v0.39
- 修复orientation值不同带来的问题
- 感谢 [Felipe Mengatto](https://github.com/felipemengatto) 的贡献

### v0.38
修改坐标反馈问题

### v0.37
- 修复 `centerBox` 的截图超出 1px 问题
- 添加截图  图片移动触发事件

### v0.36
- 修复旋转自动生成截图框的错误
- 修改 autocrop  可以动态生成截图框

### v0.35
- 修复其他图片没有压缩的问题

### v0.34
- 提供移动端崩溃的解决方案
- 修改 `maxImgSize` 为 2000

### v0.33
- 提供移动端崩溃的解决方案
- `maxImgSize` 限制图片最大宽度和高度 默认为 2000px

### v0.32
- 新增截图框信息展示
- `infoTrue`
    - `true` 为展示真实输出图片宽高
    - `false` 展示看到的截图框宽高

### v0.30

- 新增获取图片坐标函数  `this.$refs.cropper.getImgAxis()`
- 新增获取截图框坐标函数  `this.$refs.cropper.getCropAxis()`
- 新增对高清设备的兼容  `high`
- 新增截图框限制在图片以内的功能  `centerbox`
- 新增自动生成截图框函数 `this.$refs.cropper.goAutoCrop`


### v0.29
- 新增图片加载的回调 `imgLoad`  返回结果 success,  error

### v0.28
- 修复截图框固定 截图框会影响原图移动 缩放

### v0.27
- 鼠标缩放问题优化
- `img` `max-width` 样式优化
- 新增属性
    - `canMove`  是否可以移动图片   默认为是
    - `canMoveBox` 是否可以移动截图框  默认为是
    - `original`  是否按图片原始比例渲染  默认为否


### v0.26
- 修复火狐浏览器
- 鼠标缩放问题

### v0.25
- 修复图片有可能不展示

### v0.24
- 修复ios拍照旋转 截图问题
- 添加自动修复图片
- 截图预览代码变更, 修改默认上传图片为 `blob` 预览
```js
realTime (data) {
  this.previews = data
}
```
``` html
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="previews.url" :style="previews.img">
  </div>
</div>
```


### v0.23
- 小优化

### v0.22
- 新增修改图片大小函数
- 通过` this.$refs.cropper.changeScale` 调用

### v0.21
-新增固定截图框大小fiexdBox(注： 最好搭配自动生成截图框使用)

### v0.20
- 新增输出原图比例截图 props 名 full
- 修复缩放图片过大灵敏度问题

### v0.19
- 新增图片旋转
- 修复mac滚轮过度灵敏
``` js
this.$refs.cropper.rotateRight() // 向右边旋转 90 度
this.$refs.cropper.rotateLeft() // 向左边旋转 90 度
```

### v0.18
- 修复默认生成截图框超过容器错误

### v0.17
- 修复blob数据获取错误

### v0.15
- 添加手机端手势缩放
```
canScale: true
```

### v0.13
- 添加预览
  @realTime="realTime"
```js
// Real time preview function
realTime (data) {
  this.previews = data
}
```
``` html
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="option.img" :style="previews.img">
  </div>
</div>
```
