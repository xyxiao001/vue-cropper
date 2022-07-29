import exif from './exif'

import type {
  InterfaceLayoutStyle,
  InterfaceModeHandle,
  InterfaceRenderImgLayout,
  InterfaceAxis,
  InterfaceLayout,
  InterfaceImgAxis,
  InterfaceBoundary,
} from './interface'

// 图片方向校验
import Conversion from './conversion'
const conversion = new Conversion()

// 图片布局
import layout from './layoutBox'

// 加载图片方法
export const loadImg = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
    // 判断如果不是base64图片 再添加crossOrigin属性，否则会导致iOS低版本(10.2)无法显示图片
    if (url.substr(0, 4) !== 'data') {
      img.crossOrigin = ''
    }
  })
}

// 获取图片的 orientation角度
export const getExif = (img: HTMLImageElement): Promise<any> => {
  return exif.getData(img)
}

// 重置图片
export const resetImg = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement | null,
  orientation: number,
): HTMLCanvasElement | null => {
  if (!canvas) return canvas;
  return conversion.render(img, canvas, orientation)
}

export const getVersion = (name: string) => {
  var arr = navigator.userAgent.split(' '); 
  var chromeVersion = '';
  let result: any = 0;
  const reg = new RegExp(name, 'i')
  for(var i=0;i < arr.length;i++){
      if(reg.test(arr[i]))
      chromeVersion = arr[i]
  }
  if(chromeVersion){
      result = chromeVersion.split('/')[1].split('.');
  } else {
      result = ['0', '0', '0'];
  }
  return result
}

export const checkOrientationImage = (orientation: number) => {
  // 如果是 chrome内核版本在81 safari 在 605 以上不处理图片旋转
  // alert(navigator.userAgent)
  if (getVersion('chrome')[0] >= 81) {
    return -1
  }
  if (getVersion('safari')[0] >= 605) {
    const safariVersion = getVersion('version')
    if (safariVersion[0] > 13 && safariVersion[1] > 1) {
      return -1
    }
  }

   //  判断 ios 版本进行处理
   // 针对 ios 版本大于 13.4的系统不做图片旋转
    const isIos  = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
    if (isIos) {
    let version: any = isIos[1]
    version = version.split('_')
    if (version[0] > 13 ||  (version[0] >= 13 && version[1] >= 4)) {
      return -1
    }
    // 火狐浏览器
    if (getVersion('Firefox')[0] >= 97) {
      return -1
    }
    return orientation;
  }
}
// 给出图片的大小和容器大小 还有布局方式， 返回布局。
export const createImgStyle = (
  imgStyle: InterfaceLayoutStyle,
  layoutStyle: InterfaceLayoutStyle,
  mode: keyof InterfaceModeHandle,
): number => {
  return layout(imgStyle, layoutStyle, mode)
}

export const translateStyle = (style: InterfaceRenderImgLayout, axis?: InterfaceAxis): any => {
  const { scale, imgStyle, layoutStyle, rotate } = style
  const curStyle = {
    width: scale * imgStyle.width,
    height: scale * imgStyle.height,
  }
  // 图片坐标， 如果不传坐标， 默认是居中布局
  let x = (layoutStyle.width - curStyle.width) / 2
  let y = (layoutStyle.height - curStyle.height) / 2

  if (axis) {
    x = axis.x
    y = axis.y
  }

  // 通过坐标轴 计算图片的布局， 默认不旋转的计算
  // const left = x / scale
  // const top = y / scale
  const left = ((curStyle.width - imgStyle.width) / 2 + x) / scale
  const top = ((curStyle.height - imgStyle.height) / 2 + y) / scale

  // console.log(imgStyle, layoutStyle, curStyle, left, top, 'x--y-', x, y)
  return {
    imgExhibitionStyle: {
      width: `${imgStyle.width}px`,
      height: `${imgStyle.height}px`,
      transform: `scale(${scale}, ${scale}) translate3d(${left}px, ${top}px, 0px) rotateZ(${rotate}deg)`,
    },
    // 返回左上角的坐标轴
    imgAxis: {
      x,
      y,
      scale,
      rotate,
    },
  }
}

// 加载文件函数
export const loadFile = async (file: File): Promise<any> => {
  if (!file) {
    return ''
  }
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|WEBP|webp)$/.test(file.name)) {
    alert('图片类型必须是.gif,jpeg,jpg,png,bmp,webp中的一种')
    return ''
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event: Event) => {
      let data: string = ''
      const targetTwo = event.target as FileReader
      if (typeof targetTwo.result === 'object' && targetTwo.result) {
        data = window.URL.createObjectURL(new Blob([targetTwo.result]))
      } else {
        data = targetTwo.result as string
      }
      resolve(data)
    }
    reader.onerror = reject
    // 转化为blob
    reader.readAsArrayBuffer(file)
  })
}

/**
 * #### 获取绘制了图片的 canvas, 不旋转为图片大小，
 * #### 旋转则为 Math.sqrt(width * width + height * height)
 * @param { image, imgLayout, rotate, scale }
 * @return { HTMLCanvasElement }
 */
export const getImgCanvas = (
  img: HTMLImageElement,
  imgLayout: InterfaceLayoutStyle,
  rotate: number = 0,
  scale: number = 1,
): HTMLCanvasElement => {
  // 图片放在外部加载 这里不处理图片加载
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  let { width, height } = imgLayout
  let dx = 0
  let dy = 0
  let max = 0

  width = width * scale
  height = height * scale

  canvas.width = width
  canvas.height = height

  if (rotate) {
    // 坐标  nx = (x - cx) * cos A - (y - cy) * sinA   ny = (y - cy) * cosA + (x - cx) * sinA
    // 表示存在角度
    max = Math.ceil(Math.sqrt(width * width + height * height))
    canvas.width = max
    canvas.height = max
    ctx.translate(max / 2, max / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    dx = -max / 2 + (max - width) / 2
    dy = -max / 2 + (max - height) / 2
  }

  ctx.drawImage(img, dx, dy, width, height)
  ctx.restore()
  return canvas
}

/**
 * 生成最终截图函数
 * @param options
 */
export const getCropImgData = async (options: any): Promise<string> => {
  const { url, imgLayout, imgAxis, cropAxis, cropLayout, outputType, cropping } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  // 加载图片
  let img: HTMLImageElement
  try {
    img = await loadImg(url)
  } catch (e) {
    console.log(e)
    img = new Image()
  }
  return new Promise((resolve, reject) => {
    try {
      // 从这里开始对图片进行处理
      const imgCanvas = getImgCanvas(img, imgLayout, imgAxis.rotate, imgAxis.scale)
      // 计算绘制图片的偏移
      let dx = imgAxis.x - cropAxis.x
      // 图片y轴偏移
      let dy = imgAxis.y - cropAxis.y
      let width = cropLayout.width
      let height = cropLayout.height

      if (!cropping) {
        // 没有截图框
        width = imgCanvas.width
        height = imgCanvas.height
        dx = 0
        dy = 0
      }

      if (imgAxis.rotate && cropping) {
        // 表示有旋转 同时是截图, 因为 canvas 是放大了的 ，那么 x 轴和  y 轴需要偏移
        dx -= (imgCanvas.width - imgLayout.width * imgAxis.scale) / 2
        dy -= (imgCanvas.height - imgLayout.height * imgAxis.scale) / 2
      }

      canvas.width = width
      canvas.height = height

      // 是否填充背景颜色 transparent
      // const fillColor = 'transparent'
      // ctx.fillStyle = fillColor
      // ctx.fillRect(0, 0, width, height)

      // 绘制图片
      ctx.drawImage(imgCanvas, dx, dy, imgCanvas.width, imgCanvas.height)
      ctx.restore()
      // 输出图片
      const res = canvas.toDataURL(`image/${outputType}`, 1)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * 边界计算函数 -> 返回图片应该要放大到多少，以及各个方向的最大坐标点
 *  返回参数 包括是否在边界内， 以及需要往哪个方向进行回弹
 * 如果判断图片够不够大，是否进行放大处理， 即宽度 高度要比截图框大
 * 截图的 x 小于 图片的 x  那么图片需要往左移动
 * 截图框的 x + w  大于 图片的 x + w 那么图片需要右移
 * 截图 y 小于 图片的 y  那么图片上移
 * 截图的 y + h 大于 图片的 y + h 图片需要下移
 * @param  { cropAxis, cropLayout, imgAxis, imgLayout}
 * @return { top, right, bottom, left, scale}
 */
export const boundaryCalculation = (
  cropAxis: InterfaceAxis,
  cropLayout: InterfaceLayoutStyle,
  imgAxis: InterfaceImgAxis,
  imgLayout: InterfaceLayoutStyle,
): InterfaceBoundary => {
  // 返回各个方向允许的值，以及图片的最小缩放比例
  // 先不管有旋转的情况，默认为没有旋转的返回
  const boundary: InterfaceBoundary = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    scale: 1,
  }
  // 根据当前比例去计算 需不要去放大图片
  let scale = imgAxis.scale

  // 如果有角度，那么宽高需要取最大值去处理
  let width = imgLayout.width;
  let height = imgLayout.height;

  let imgWidth = width * scale
  let imgHeight = height * scale

  if (imgWidth < cropLayout.width || imgHeight < cropLayout.height) {
    scale = Math.max(cropLayout.width / width, cropLayout.height / height)
  }

  imgWidth = width * scale
  imgHeight = height * scale

  boundary.scale = scale

  // 左边的最大值 即图片的左边的坐标应该小于截图框坐标的坐标
  boundary.left = cropAxis.x

  // 右边的最小值， 图片坐标加图片宽度应该大于 截图框的坐标加上截图框的宽度
  boundary.right = cropAxis.x + cropLayout.width - imgWidth

  // 上面最大的值，应该小于这个值
  boundary.top = cropAxis.y

  // 下面最小的值
  boundary.bottom = cropAxis.y + cropLayout.height - imgHeight

  const rotate = imgAxis.rotate
  // 此时应该判断 如果当前操作是属于放大缩小， 选择才采用当前判断 获取图片的四个点的坐标轴。 这时代表采取新的检测方式去判断
  // 移动距离的计算可以先获得点到矩形中心的向量，然后计算该向量在矩形边框上的投影向量，最后可以用投影向量的长度减去边框长度的一半得到
  const rectImg = getRectPoints(imgAxis.x, imgAxis.y, imgWidth, imgHeight, rotate)
  const rectCrop = getRectPoints(cropAxis.x, cropAxis.y, cropLayout.width, cropLayout.height)
  const isCover = isWholeCover(rectImg, rectCrop)
  if (!isCover) {
    // 获取目前矩形的坐标
    // console.log(rectImg, rectCrop)

    // 图片如果超过左边应该移动到的点是 ->图片左边和截图框上边相交的点, 以及是否小于左边夹角最小容纳区域
    const intersectionPointLeft = lineIntersectionPoint(
      rectImg[0],
      rectImg[3],
      rectCrop[0],
      rectCrop[1],
    )
    // console.log(intersectionPointLeft, '左边交点坐标')
    const moveLeft = intersectionPointLeft.x - rectCrop[0].x
    boundary.left = getPointChange(
      'left',
      rectImg,
      rectCrop,
      cropAxis,
      cropLayout,
      imgAxis,
      imgLayout,
      moveLeft,
    )
    // console.log('left边界', boundary.left)

    // 图片如果超过顶部应该移动到的点是 -> 图片上方和截图框右边相交的点，以及是否小于左边夹角最小容纳区域
    const intersectionPointTop = lineIntersectionPoint(
      rectImg[0],
      rectImg[1],
      rectCrop[1],
      rectCrop[2],
    )
    // console.log(intersectionPointTop, '顶部交点坐标')
    const moveTop = intersectionPointTop.y + cropAxis.y
    boundary.top = getPointChange(
      'top',
      rectImg,
      rectCrop,
      cropAxis,
      cropLayout,
      imgAxis,
      imgLayout,
      moveTop,
    )
    // console.log('top边界', boundary.top)

    // 图片右边的限制
    const intersectionPointRight = lineIntersectionPoint(
      rectImg[1],
      rectImg[2],
      rectCrop[3],
      rectCrop[2],
    )
    // console.log(intersectionPointRight, '右边交点坐标')
    const moveRight = intersectionPointLeft.x - rectCrop[2].x
    boundary.right = getPointChange(
      'right',
      rectImg,
      rectCrop,
      cropAxis,
      cropLayout,
      imgAxis,
      imgLayout,
      moveRight,
    )
    // console.log('right边界', boundary.right)

    // console.log(boundary)
  }

  return boundary
}

// 移动矩形返回新坐标
export const moveRect = (x: number, y: number, rect: InterfaceAxis[]): InterfaceAxis[] => {
  let newRect = JSON.parse(JSON.stringify(rect))
  newRect = newRect.map((item: InterfaceAxis) => {
    item.x += x
    item.y += y
    return item
  })
  return newRect
}

// 返回两条直线的交点坐标
export const lineIntersectionPoint = (
  point1: InterfaceAxis,
  point2: InterfaceAxis,
  point3: InterfaceAxis,
  point4: InterfaceAxis,
): InterfaceAxis => {
  // console.log(point1, point2, point3, point4)
  const a = point2.y - point1.y
  const b = point2.x * point1.y - point1.x * point2.y
  const c = point2.x - point1.x
  const d = point4.y - point3.y
  const e = point4.x * point3.y - point3.x * point4.y
  const f = point4.x - point3.x
  const y = (a * e - b * d) / (a * f - c * d)
  const x = (y * c - b) / a
  return {
    x,
    y,
  }
}

// 获取图片方向的限制点的坐标
export const getPointChange = (
  type: string,
  rectImg: InterfaceAxis[],
  rectCrop: InterfaceAxis[],
  cropAxis: InterfaceAxis,
  cropLayout: InterfaceLayoutStyle,
  imgAxis: InterfaceImgAxis,
  imgLayout: InterfaceLayoutStyle,
  moveChange = 0,
): number => {
  // 参照边
  let reference = cropLayout.width
  if (type === 'left' || 'right') {
    reference = cropLayout.height
  }
  // 参照坐标
  let referenceAxis = 0
  if (type === 'top') {
    referenceAxis = -cropAxis.y
  }
  if (type === 'left') {
    // 这个表示左边的距离
    referenceAxis = cropAxis.x
  }

  if (type === 'right') {
    // 这个表示右边边的距离， 截图框右边的坐标
    referenceAxis = rectCrop[1].x - (rectImg[1].x - rectImg[0].x)
  }
  const distance =
    reference *
    Math.sin((imgAxis.rotate / 180) * Math.PI) *
    Math.sin(((90 - imgAxis.rotate) / 180) * Math.PI)
  // 点的坐标
  let pointAxis = 0
  if (type === 'top') {
    pointAxis = referenceAxis + distance
  }

  if (type === 'left') {
    pointAxis = referenceAxis - distance
  }

  if (type === 'right') {
    pointAxis = referenceAxis + distance
  }

  // 变化量
  let index = 0
  let change = 0
  if (type === 'top') {
    index = 0
    change = rectImg[index].y - pointAxis
  }
  if (type === 'left') {
    index = 3
    change = rectImg[index].x - pointAxis
  }
  if (type === 'right') {
    index = 1
    change = rectImg[index].x - pointAxis
  }
  // 平移后的矩形坐标
  const curRectImg = rectImg.map(item => {
    const obj = {
      x: item.x,
      y: item.y,
    }
    if (type === 'top') {
      // console.log(change, moveChange, '---')
      if (change > moveChange) {
        change = moveChange
      }
      obj.y = obj.y - change
    }
    if (type === 'left') {
      if (change < moveChange) {
        change = moveChange
      }
      obj.x = obj.x - change
    }

    if (type === 'right') {
      // console.log(`ddiidid${moveChange}， ${change}`)
      // if (change < moveChange) {
      //   console.log(`daaaa${moveChange}， ${change}`)
      //   change = moveChange
      // }
      obj.x = obj.x - change
    }
    return obj
  })
  // 反向推出不旋转的原始坐标
  const originalRectImg = getRotateAxis(curRectImg, getPointsCenter(curRectImg), imgAxis.rotate)
  let res = 0
  if (type === 'top') {
    res = -originalRectImg[index].y
  }
  if (type === 'left' || type === 'right') {
    res = originalRectImg[index].x
  }
  return res
}

// 返回当前每个方向极端的索引->左， 上，右， 下
export const getIndexArr = (rotate?: number): number[] => {
  // 矩形的存储坐标为上左， 上右，下右， 下左
  const arr = [3, 0, 1, 2]
  return arr
}

// 判断图片是否完全包含截图框
export const isWholeCover = (rectImg: InterfaceAxis[], rectCrop: InterfaceAxis[]) => {
  for (const i of rectCrop) {
    // 检测截图框的 4 个点是不是在矩形里面
    if (!isPointInRectCheckByLen(i, rectImg)) {
      return false
    }
  }
  return true
}

// 根据矩形中心到某一点向量在矩形边框向量的投影长度判断该点是否在矩形内
export const isPointInRectCheckByLen = (
  point: InterfaceAxis,
  rectPoints: InterfaceAxis[],
): boolean => {
  const pcv = getPCVectorProjOnUpAndRight(point, rectPoints)
  // console.log(pcv)
  const precision = 100 // 保留两位小数

  const uLen = Math.round(vecLen(pcv.uproj) * precision)
  const height = Math.round((vecLen(pcv.up) / 2) * precision)
  const rLen = Math.round(vecLen(pcv.rproj) * precision)
  const width = Math.round((vecLen(pcv.right) / 2) * precision)
  // console.log(uLen, rLen, width, height)
  return uLen <= height && rLen <= width
}

// 计算矩形中心到某点的向量在矩形自身坐标系上方向和右方向上的投影向量
export const getPCVectorProjOnUpAndRight = (point: InterfaceAxis, rectPoints: InterfaceAxis[]) => {
  // 计算矩形自身坐标系的上方向向量和右方向向量
  const up = {
    x: rectPoints[1].x - rectPoints[2].x,
    y: rectPoints[1].y - rectPoints[2].y,
  }
  const right = {
    x: rectPoints[1].x - rectPoints[0].x,
    y: rectPoints[1].y - rectPoints[0].y,
  }
  // 计算矩形中心点
  const center = getPointsCenter(rectPoints)
  const line = {
    x: point.x - center.x,
    y: point.y - center.y,
  }
  const uproj = getProjectionVector(line, up)
  const rproj = getProjectionVector(line, right)
  return {
    up,
    uproj,
    right,
    rproj,
  }
}

// 计算向量 a 在向量 b 上的投影向量
export const getProjectionVector = (vecA: InterfaceAxis, vecB: InterfaceAxis): InterfaceAxis => {
  const bLen = vecLen(vecB)
  const ab = vecA.x * vecB.x + vecA.y * vecB.y

  const proj = {
    x: (ab / Math.pow(bLen, 2)) * vecB.x,
    y: (ab / Math.pow(bLen, 2)) * vecB.y,
  }
  return proj
}

// 获得矩形点坐标中心
export const getPointsCenter = (points: InterfaceAxis[]) => {
  const center = {
    x: (points[0].x + points[2].x) / 2,
    y: (points[0].y + points[2].y) / 2,
  }
  return center
}

// 计算向量的模
export const vecLen = (vec: InterfaceAxis): number => {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}

// 获取矩形的坐标轴
export const getRectPoints = (
  x: number,
  y: number,
  width: number,
  height: number,
  rotate = 0,
): InterfaceAxis[] => {
  // 先计算图片原始坐标  上左 上右 下右  下左
  let oldRect = [
    {
      x,
      y,
    },
    {
      x: x + width,
      y,
    },
    {
      x: x + width,
      y: y + height,
    },
    {
      x,
      y: y + height,
    },
  ]
  // 对坐标轴进行处理
  oldRect = oldRect.map(item => {
    // 反转 y 轴
    item.y = -item.y
    return item
  })
  if (rotate === 0) {
    // 没有旋转直接返回坐标
    return oldRect
  }
  // 获取图片的中心点
  const center = getPointsCenter(oldRect)
  // 中心旋转之后得到新坐标
  const newRect = getRotateAxis(oldRect, center, rotate)
  return newRect
}

// 矩形绕一点旋转后的新坐标
export const getRotateAxis = (
  rect: InterfaceAxis[],
  points: InterfaceAxis,
  rotate: number,
): InterfaceAxis[] => {
  // 计算坐标轴， 转化为极坐标方程 然后转化为圆的方程, 求出新坐标
  const angel = (rotate * Math.PI) / 180
  rect = JSON.parse(JSON.stringify(rect))
  return rect.map(item => {
    const { x, y } = item
    item.x = (x - points.x) * Math.cos(angel) - (y - points.y) * Math.sin(angel) + points.x
    item.y = (y - points.y) * Math.cos(angel) + (x - points.x) * Math.sin(angel) + points.y
    return item
  })
}

// 获取坐标系绕一点绕另一点旋转后的坐标
export const getRotatePointAxis = (
  original: InterfaceAxis,
  points: InterfaceAxis,
  rotate: number,
): InterfaceAxis => {
  const angel = (rotate * Math.PI) / 180
  const { x, y } = original
  return {
    x: (x - points.x) * Math.cos(angel) - (y - points.y) * Math.sin(angel) + points.x,
    y: (y - points.y) * Math.cos(angel) + (x - points.x) * Math.sin(angel) + points.y,
  }
}

/**
 * 边界校验函数, 截图框应该被包裹在容器里面
 * @param  { cropAxis, cropLayout, imgAxis, imgLayout}
 * @return
 */

export const detectionBoundary = (
  cropAxis: InterfaceAxis,
  cropLayout: InterfaceLayoutStyle,
  imgAxis: InterfaceImgAxis,
  imgLayout: InterfaceLayoutStyle,
) => {
  // 横向的方向
  let landscape = ''
  // 纵向的方向
  let portrait = ''
  // 判断横向
  const boundary: InterfaceBoundary = boundaryCalculation(cropAxis, cropLayout, imgAxis, imgLayout)

  const scale = boundary.scale

  if (imgAxis.x >= boundary.left) {
    landscape = 'left'
  }

  if (imgAxis.x < boundary.right) {
    landscape = 'right'
  }

  if (imgAxis.y >= boundary.top) {
    portrait = 'top'
  }

  if (imgAxis.y < boundary.bottom) {
    portrait = 'bottom'
  }

  return {
    landscape,
    portrait,
    scale,
    boundary,
    imgAxis,
  }
}

/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html' to get effect
 */
export const tween = {
  easeInOut: (t: number, b: number, c: number, d: number) => {
    t = (t / d) * 2
    if (t < 1) {
      return (c / 2) * t * t + b
    }
    return (-c / 2) * (--t * (t - 2) - 1) + b
  },
}

export const setAnimation = (
  from: number,
  to: number,
  duration: number,
  callback?: (value: number) => void,
) => {
  // 算法需要的几个变量
  let start = 0
  // during根据设置的总时间计算
  const during = Math.ceil(duration / 17)
  // 动画请求帧
  let req: number = 0

  const step = () => {
    const value = tween.easeInOut(start, from, to - from, during)
    start++
    // 如果还没有运动到位，继续
    if (start <= during) {
      if (callback) {
        callback(value)
      }
      req = requestAnimationFrame(step)
    } else {
      // 动画结束，这里可以插入回调...
      if (callback) {
        callback(to)
      }
    }
  }
  step()
  return (): number => req
}
