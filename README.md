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
### 内置方法  通过this.$refs.cropper 调用
##### this.$refs.cropper.startCrop()  开始截图
##### this.$refs.cropper.stopCrop()  停止截图
##### this.$refs.cropper.clearCrop()  清除截图
##### this.$refs.cropper.getCropDate()  获取截图信息
