## vue-cropper
### 一个优雅的图片裁剪插件
 [预览](http://xyxiao.cn/vue-cropper/example/)
 [english](https://github.com/xyxiao001/vue-cropper/blob/master/english.md)
# vue-cropper

####   安装 npm install vue-cropper
####   使用  import VueCropper from vue-cropper
```
<vueCropper
  ref="cropper"
  :img="option.img"
  :outputSize="option.size"
  :outputType="option.outputType"
></vueCropper>
```
<table style="text-align: center">
  <thead>
    <tr>
        <td>名称</td>
        <td>功能</td>
        <td>默认值</td>
        <td>可选值</td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>img</td>
        <td>裁剪图片的地址</td>
        <td>空</td>
        <td>url 地址 || base64 || blob</td>
    </tr>
    <tr>
        <td>outputSize</td>
        <td>裁剪生成图片的质量</td>
        <td>1</td>
        <td>0.1 - 1</td>
    </tr>
    <tr>
        <td>outputType</td>
        <td>裁剪生成图片的格式</td>
        <td>jpg (jpg 需要传入jpeg)</td>
        <td>jpeg || png || webp</td>
    </tr>
    <tr>
        <td>info</td>
        <td>裁剪框的大小信息</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>canScale</td>
        <td>图片是否允许滚轮缩放</td>
        <td>true</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>autoCrop</td>
        <td>是否默认生成截图框</td>
        <td>false</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>autoCropWidth</td>
        <td>默认生成截图框宽度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>autoCropHeight</td>
        <td>默认生成截图框高度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>是否开启截图框宽高固定比例</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedNumber</td>
        <td>截图框的宽高比例</td>
        <td>[1 : 1]</td>
        <td>[宽度 : 高度]</td>
    </tr>
    <tr>
        <td>full</td>
        <td>是否输出原图比例的截图</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedBox</td>
        <td>固定截图框大小 不允许改变</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMove</td>
        <td>上传图片是否可以移动</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMoveBox</td>
        <td>截图框能否拖动</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>original</td>
        <td>上传图片按照原始比例渲染</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
  </tbody>
</table>


### 内置方法  通过this.$refs.cropper 调用
##### this.$refs.cropper.startCrop()  开始截图
##### this.$refs.cropper.stopCrop()  停止截图
##### this.$refs.cropper.clearCrop()  清除截图
##### this.$refs.cropper.changeScale()  修改图片大小 正数为变大 负数变小
#####  获取截图信息
this.$refs.cropper.cropW  截图框宽度

this.$refs.cropper.cropH 截图框高度
```
获取截图的base64 数据
this.$refs.cropper.getCropData((data) => {
  // do something
  console.log(data)  
})

获取截图的blob数据
this.$refs.cropper.getCropBlob((data) => {
  // do something
  console.log(data)  
})
```

## 更新日志
### v0.29
### 新增图片加载的回调 imgLoad  返回结果success,  error
### v0.28
### 修复截图框固定 截图框会影响原图移动 缩放
### v0.27
### 鼠标缩放问题优化
### img max-width 样式优化
### 新增属性  
#### canMove  是否可以移动图片   默认为是
#### canMoveBox 是否可以移动截图框  默认为是
#### original  是否按图片原始比例渲染  默认为否


### v0.26
#### 修复火狐浏览器 鼠标缩放问题

### v0.25
#### 修复图片有可能不展示

### v0.24
#### 修复ios拍照旋转 截图问题 添加自动修复图片 截图预览代码变更, 修改默认上传图片为blob预览
```
realTime (data) {
  this.previews = data
}
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="previews.url" :style="previews.img">
  </div>
</div>
```


### v0.23
#### 小优化
### v0.22
#### 新增修改图片大小函数 通过this.$refs.cropper.changeScale 调用

### v0.21
#### 新增固定截图框大小fiexdBox(注： 最好搭配自动生成截图框使用)

### v0.20
#### 新增输出原图比例截图 props名full,  修复缩放图片过大灵敏度问题

### v0.19 新增图片旋转 修复mac滚轮过度灵敏
```
this.$refs.cropper.rotateRight() 向右边旋转90度
this.$refs.cropper.rotateLeft() 向左边旋转90度
```

### v0.18 修复默认生成截图框超过容器错误
### v0.17 修复blob数据获取错误
### v0.15 添加手机端手势缩放
```
canScale: true
```

### v0.13 添加预览
```
@realTime="realTime"
// Real time preview function
realTime (data) {
  this.previews = data
}
<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}">
  <div :style="previews.div">
    <img :src="option.img" :style="previews.img">
  </div>
</div>
```
