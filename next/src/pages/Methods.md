# 方法
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
