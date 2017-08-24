## vue-crpopper
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
  </tbody>
</table>


### 内置方法  通过this.$refs.cropper 调用
##### this.$refs.cropper.startCrop()  开始截图
##### this.$refs.cropper.stopCrop()  停止截图
##### this.$refs.cropper.clearCrop()  清除截图
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
### v0.19 新增图片旋转 修复mac滚轮过度灵敏
```
this.$cropper.rotateRight() 向左边旋转90度
this.$cropper.rotateLeft() 向左边旋转90度
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
