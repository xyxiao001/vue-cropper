# 事件

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
