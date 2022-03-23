<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, toRefs, watch, useSlots } from 'vue'
import { InterfaceAxis, InterfaceImgLoad, InterfaceLayout, InterfaceMessageEvent, InterfaceModeHandle, InterfaceTransformStyle } from './interface'
import {
  loadImg,
  getExif,
  resetImg,
  createImgStyle,
  translateStyle,
  loadFile,
  getCropImgData,
  detectionBoundary,
  setAnimation,
  checkOrientationImage,
} from './common'
import { supportWheel, changeImgSize, isIE } from './changeImgSize'
import './style/index.scss'
import { BOUNDARY_DURATION } from './config'

import TouchEvent from './touch'
import cropperLoading from './loading'
import './style/index.scss'

interface InterfaceVueCropperProps {
  // 图片地址
  img?: string
  // 外层容器宽高
  wrapper?: InterfaceLayout
  // 主题色
  color?: string,
  // 滤镜函数
  filter?: ((canvas: HTMLCanvasElement) => HTMLCanvasElement) | null,
  // 输出格式
  outputType?: string,
  // 布局方式
  mode?: keyof InterfaceModeHandle,
  // 截图框的颜色
  cropColor?: string,
  // 默认旋转角度
  defaultRotate?: number,
  // 截图框是否限制图片里面
  centerBox?: boolean
}
const props = withDefaults(defineProps<InterfaceVueCropperProps>(), {
  img: '',
  wrapper: {
    width: '300px',
    height: '300px',
  },
  color: '#fff',
  filter: null,
  outputType: 'png',
  mode: 'cover',
  cropColor: '#fff',
  defaultRotate: 0,
  centerBox: false,
})
// 组件处理
const cropperRef = ref()
const cropperImg = ref()
const cropperBox = ref()
const emit = defineEmits<{
  (e: 'img-load', obj: InterfaceImgLoad): void,
  (e: 'img-upload', url: string): void
}>()
// 图片加载loading
const imgLoading = ref(false)

// 真实图片渲染地址
const imgs = ref('')

// 高清屏的问题
const ratio: number = window.devicePixelRatio

// 绘制图片的canvas
let canvas: HTMLCanvasElement | null = null

const LayoutContainer = reactive({
  // 图片真实宽高
  imgLayout: {
    width: 0,
    height: 0,
  },
  // 外层容器宽高
  wrapLayout: {
    width: 0,
    height: 0,
  },
  // 图片属性 包含当前坐标轴和缩放
  imgAxis: {
    x: 0,
    y: 0,
    scale: 0,
    rotate: 0,
  },
  // 图片css 转化之后的展示效果
  imgExhibitionStyle: {
    width: '',
    height: '',
    transform: '',
  },
  // 截图框的坐标
  cropAxis: {
    x: 0,
    y: 0,
  },
  // 截图框的大小
  cropLayout: {
    width: 200,
    height: 200,
  },
  // 截图框的样式， 包含外层和里面
  cropExhibitionStyle: {
    div: {},
    img: {},
  }
})

// 拖拽
const isDrag = ref(false)

// 裁剪过程中的一些状态
// 当前是否可以拖动
const move = ref(true)

// 当前正在拖拽生成截图框
const crop = ref(false)

// 处于生成了截图的状态
const cropping = ref(true)

// 当前截图框是否处于动画状态 即回弹状态
const isCropAnimate = ref(false)

// 当前图片是否处于动画状态 即回弹状态
const isImgAnimate = ref(false)

// 截图框是否已经被拖出出限定的范围， 添加阻力
const isCropCrossing = ref(false)

// 图片是否已经被拖出出限定的范围， 添加阻力
const isImgCrossing = ref(false)

let cropImg: TouchEvent | null = null

let cropBox: TouchEvent | null = null

const waitingImgChecked = ref(false)

const setWaitFunc = ref(0)

// 处理 props
const { img, filter, mode, defaultRotate, outputType, centerBox } = toRefs(props);

watch(img, (val) => {
  if (val && val !== imgs.value) {
    checkedImg(val)
  }
})

watch(imgs, (val) => {
  if (val) {
    nextTick(() => {
      bindMoveImg()
    })

    if (cropping.value) {
      nextTick(() => {
        bindMoveCrop()
      })
    }
  }
})

watch(cropping, (val) => {
  if (val) {
    nextTick(() => {
      bindMoveCrop()
    })
  }
})

watch(filter, (val) => {
  if (val) {
    imgLoading.value = true;
    checkedImg(img.value)
  }
})

watch(mode, () => {
  imgLoading.value = true;
  checkedImg(img.value)
})

watch(defaultRotate, (val) => {
  setRotate(val)
})

const imgLoadEmit = (obj: InterfaceImgLoad) => {
  emit('img-load', obj);
}

const imgUploadEmit = (url: string) => {
  emit('img-upload', url);
}

const drop = (e: DragEvent) => {
  e.preventDefault()
  const dataTransfer = e.dataTransfer as DataTransfer
  isDrag.value = false
  loadFile(dataTransfer.files[0]).then(res => {
    if (res) {
      imgUploadEmit(res)
    }
  })
}

const dragover = (e: Event) => {
  e.preventDefault()
  isDrag.value = true
}

const dragend = (e: Event) => {
  e.preventDefault()
  isDrag.value = false
}

// 检查图片, 修改图片为正确角度
const checkedImg = async (url: string) => {
  imgLoading.value = true
  imgs.value = ''
  canvas = null
  let img: HTMLImageElement
  try {
    img = await loadImg(url)
    imgLoadEmit({
      type: 'success',
      message: '图片加载成功',
    })
  } catch (error) {
    imgLoadEmit({
      type: 'error',
      message: `图片加载失败${error}`,
    })
    imgLoading.value = false
    return false
  }
  // 图片加载成功之后的操作 获取图片旋转角度
  let result = {
    orientation: -1,
  }
  try {
    result = await getExif(img)
  } catch (error) {
    console.log(error)
    result.orientation = 1
  }
  let orientation = result.orientation || -1
  orientation = checkOrientationImage(orientation)
  // console.log(`图片加载成功,orientation为${orientation}`)

  // 图片不需要进行处理的
  // if ((orientation === 1 || orientation === -1) && !this.filter) {
  //   try {
  //     await this.renderImgLayout(url)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   this.imgs = this.img
  //   this.isLoading = false
  //   return
  // }

  let newCanvas: HTMLCanvasElement = document.createElement('canvas')
  try {
    newCanvas = await resetImg(img, newCanvas, orientation) ?? newCanvas
  } catch (error) {
    console.error(error)
  }
  canvas = newCanvas
  renderFilter()
}

// 滤镜渲染
const renderFilter = () => {
  if (filter.value) {
    let newCanvas = canvas as HTMLCanvasElement
    newCanvas = filter.value(newCanvas) ?? newCanvas
    canvas = newCanvas
  }
  createImg()
}

// 生成新图片
const createImg = () => {
  if (!canvas) {
    return
  }
  try {
    canvas.toBlob(
      async blob => {
        if (blob) {
          URL.revokeObjectURL(imgs.value)
          const url = URL.createObjectURL(blob)
          let scale = 1
          try {
            scale = await renderImgLayout(url)
          } catch (e) {
            console.error(e)
          }
          const style = translateStyle({
            scale,
            imgStyle: { ...LayoutContainer.imgLayout },
            layoutStyle: { ...LayoutContainer.wrapLayout },
            rotate: defaultRotate.value,
          })
          LayoutContainer.imgExhibitionStyle = style.imgExhibitionStyle
          LayoutContainer.imgAxis = style.imgAxis
          imgs.value = url
          // 渲染截图框
          if (cropping.value) {
            renderCrop()
          }
          reboundImg()
          imgLoading.value = false
        } else {
          imgs.value = ''
          imgLoading.value = false
        }
      },
      `image/${outputType.value}`,
      1,
    )
  } catch (e) {
    console.error(e)
    imgLoading.value = false
  }
}

// 渲染图片布局
const renderImgLayout = async (url: string): Promise<number> => {
  let img: HTMLImageElement
  try {
    img = await loadImg(url)
    imgLoadEmit({
      type: 'success',
      message: '图片加载成功',
    })
  } catch (error) {
    imgLoadEmit({
      type: 'error',
      message: `图片加载失败${error}`,
    })
    imgLoading.value = false
    return 1;
  }
  const wrapper = {
    width: 0,
    height: 0,
  }
  wrapper.width = Number(
    (window.getComputedStyle(cropperRef.value).width || '').replace('px', ''),
  )
  wrapper.height = Number(
    (window.getComputedStyle(cropperRef.value).height || '').replace('px', ''),
  )
  LayoutContainer.imgLayout = {
    width: img.width,
    height: img.height,
  }
  LayoutContainer.wrapLayout = { ...wrapper }

  return createImgStyle({ ...LayoutContainer.imgLayout }, wrapper, mode.value)
}

// 鼠标移入截图组件
const mouseInCropper = () => {
  if (isIE) {
    window.addEventListener(supportWheel, mouseScroll)
  } else {
    window.addEventListener(supportWheel, mouseScroll, {
      passive: false,
    })
  }
}

// 鼠标移出截图组件
const mouseOutCropper = () => {
  // console.log('remove')
  window.removeEventListener(supportWheel, mouseScroll)
}

// 鼠标滚动事件
const mouseScroll = (e: Event) => {
  e.preventDefault()
  const scale = changeImgSize(e, LayoutContainer.imgAxis.scale, LayoutContainer.imgLayout)
  setScale(scale)
  // console.log('scroll')
}
onMounted(() => {
  if (props.img) {
    checkedImg(props.img)
  } else {
    imgs.value = ''
  }
  // 添加拖拽上传
  const dom = cropperRef.value
  dom.addEventListener('dragover', dragover, false)
  dom.addEventListener('dragend', dragend, false)
  dom.addEventListener('drop', drop, false)
})

onUnmounted(() => {
  cropperRef.value?.removeEventListener('drop', drop, false)
  cropperRef.value?.removeEventListener('dragover', dragover, false)
  cropperRef.value?.removeEventListener('dragend', dragend, false)
  unbindMoveImg()
  unbindMoveCrop()
})

// 修改图片缩放比例函数
const setScale = (scale: number, keep: boolean = false) => {
  // 保持当前坐标比例
  const axis = {
    x: LayoutContainer.imgAxis.x,
    y: LayoutContainer.imgAxis.y,
  }
  if (!keep) {
    axis.x -= (LayoutContainer.imgLayout.width * (scale - LayoutContainer.imgAxis.scale)) / 2
    axis.y -= (LayoutContainer.imgLayout.height * (scale - LayoutContainer.imgAxis.scale)) / 2
  }

  const style = translateStyle(
    {
      scale,
      imgStyle: { ...LayoutContainer.imgLayout },
      layoutStyle: { ...LayoutContainer.wrapLayout },
      rotate: LayoutContainer.imgAxis.rotate,
    },
    axis,
  )
  LayoutContainer.imgExhibitionStyle = style.imgExhibitionStyle
  LayoutContainer.imgAxis = style.imgAxis
  // 设置完成图片大小后去校验 图片的坐标轴
  clearTimeout(setWaitFunc.value)
  setWaitFunc.value = setTimeout(() => {
    reboundImg()
    waitingImgChecked.value = false
  }, BOUNDARY_DURATION)
}

// 移动图片
const moveImg = (message: InterfaceMessageEvent) => {
  // 拿到的是变化之后的坐标轴
  if (message.change) {
    // console.log(message.change)
    // 去更改图片的位置
    const axis = {
      x: message.change.x + LayoutContainer.imgAxis.x,
      y: message.change.y + LayoutContainer.imgAxis.y,
    }

    // if (this.centerBox) {
    //   // 这个时候去校验下是否图片已经被拖拽出了不可限制区域，添加回弹
    //   const crossing = detectionBoundary(
    //     { ...this.cropAxis },
    //     { ...this.cropLayout },
    //     { ...this.imgAxis },
    //     { ...this.imgLayout },
    //   )

    //   if (crossing.landscape !== '' || crossing.portrait !== '') {
    //     // 施加拖动阻力 ？是否需要添加越来越大的阻力
    //     axis.x = this.imgAxis.x + message.change.x * RESISTANCE
    //     axis.y = this.imgAxis.y + message.change.y * RESISTANCE
    //   }
    // }

    setImgAxis(axis)
  }
}

// 设置图片坐标
const setImgAxis = (axis: InterfaceAxis) => {
  const style = translateStyle(
    {
      scale: LayoutContainer.imgAxis.scale,
      imgStyle: { ...LayoutContainer.imgLayout },
      layoutStyle: { ...LayoutContainer.wrapLayout },
      rotate: LayoutContainer.imgAxis.rotate,
    },
    axis,
  )
  LayoutContainer.imgExhibitionStyle = style.imgExhibitionStyle
  LayoutContainer.imgAxis = style.imgAxis
}

// 回弹图片
const reboundImg = (): void => {
  if (!centerBox.value) {
    return
  }
  // 这个时候去校验下是否图片已经被拖拽出了不可限制区域，添加回弹
  const crossing = detectionBoundary(
    { ...LayoutContainer.cropAxis },
    { ...LayoutContainer.cropLayout },
    { ...LayoutContainer.imgAxis },
    { ...LayoutContainer.imgLayout },
  )
  // console.log(crossing)
  if (LayoutContainer.imgAxis.scale < crossing.scale) {
    setAnimation(LayoutContainer.imgAxis.scale, crossing.scale, BOUNDARY_DURATION, value => {
      setScale(value, true)
    })
  }

  if (crossing.landscape === 'left') {
    setAnimation(LayoutContainer.imgAxis.x, crossing.boundary.left, BOUNDARY_DURATION, value => {
      // console.log('set left', value)
      setImgAxis({
        x: value,
        y: LayoutContainer.imgAxis.y,
      })
    })
  }

  if (crossing.landscape === 'right') {
    setAnimation(LayoutContainer.imgAxis.x, crossing.boundary.right, BOUNDARY_DURATION, value => {
      setImgAxis({
        x: value,
        y: LayoutContainer.imgAxis.y,
      })
    })
  }

  if (crossing.portrait === 'top') {
    setAnimation(LayoutContainer.imgAxis.y, crossing.boundary.top, BOUNDARY_DURATION, value => {
      // console.log('set top', value)
      setImgAxis({
        x: LayoutContainer.imgAxis.x,
        y: value,
      })
    })
  }

  if (crossing.portrait === 'bottom') {
    setAnimation(LayoutContainer.imgAxis.y, crossing.boundary.bottom, BOUNDARY_DURATION, value => {
      setImgAxis({
        x: LayoutContainer.imgAxis.x,
        y: value,
      })
    })
  }

  // console.log('可以开始校验位置，回弹了')
}

// 绑定拖拽
const bindMoveImg = (): void => {
  unbindMoveImg()
  const domImg = cropperImg.value
  cropImg = new TouchEvent(domImg)
  // 图片拖拽绑定
  cropImg.on('down-to-move', moveImg)
  cropImg.on('up', reboundImg)
}

const unbindMoveImg = (): void => {
  if (cropImg) {
    cropImg.off('down-to-move', moveImg)
    cropImg.off('up', reboundImg)
  }
}

const bindMoveCrop = (): void => {
  unbindMoveCrop()
  const domBox = cropperBox.value
  cropBox = new TouchEvent(domBox)
  cropBox.on('down-to-move', moveCrop)
  cropBox.on('up', reboundImg)
  cropImg = null
}

const unbindMoveCrop = (): void => {
  if (cropBox) {
    cropBox.off('down-to-move', moveCrop)
    cropBox.off('up', reboundImg)
    cropBox = null
  }
}

// 设置旋转角度
const setRotate = (rotate: number) => {
  const { x, y, scale } = LayoutContainer.imgAxis
  const axis = { x, y }
  const style = translateStyle(
    {
      scale,
      imgStyle: { ...LayoutContainer.imgLayout },
      layoutStyle: { ...LayoutContainer.wrapLayout },
      rotate,
    },
    axis,
  )
  LayoutContainer.imgExhibitionStyle = style.imgExhibitionStyle
  LayoutContainer.imgAxis = style.imgAxis
}

// 获取截图信息
const getCropData = (type?: string) => {
  // 组合数据
  const obj = {
    type: type ? type : 'base64',
    outputType: outputType.value,
    url: imgs.value,
    imgAxis: { ...LayoutContainer.imgAxis },
    imgLayout: { ...LayoutContainer.imgLayout },
    cropLayout: { ...LayoutContainer.cropLayout },
    cropAxis: { ...LayoutContainer.cropAxis },
    cropping: cropping.value,
  }
  return getCropImgData(obj)
}

// 渲染截图框
const renderCrop = (axis?: InterfaceAxis): void => {
  // 如果没有指定截图框的容器位置， 默认截图框为居中布局
  const { width, height } = LayoutContainer.wrapLayout
  let cropW = LayoutContainer.cropLayout.width
  let cropH = LayoutContainer.cropLayout.height
  cropW = cropW < width ? cropW : width
  cropH = cropW < height ? cropH : height
  const defaultAxis: InterfaceAxis = {
    x: (width - cropW) / 2,
    y: (height - cropH) / 2,
  }
  // 校验截图框位置
  if (axis) {
    checkedCrop(axis)
  } else {
    checkedCrop(defaultAxis)
  }
}

// 移动截图框
const moveCrop = (message: InterfaceMessageEvent) => {
  // 拿到的是变化之后的坐标轴
  if (message.change) {
    const axis = {
      x: message.change.x + LayoutContainer.cropAxis.x,
      y: message.change.y + LayoutContainer.cropAxis.y,
    }
    checkedCrop(axis)
  }
}

// 检查截图框位置
const checkedCrop = (axis: InterfaceAxis) => {
  // 截图了默认不允许超过容器
  const maxLeft = 0
  const maxTop = 0
  const maxRight = LayoutContainer.wrapLayout.width - LayoutContainer.cropLayout.width
  const maxBottom = LayoutContainer.wrapLayout.height - LayoutContainer.cropLayout.height
  if (axis.x < maxLeft) {
    axis.x = maxLeft
  }

  if (axis.y < maxTop) {
    axis.y = maxTop
  }

  if (axis.x > maxRight) {
    axis.x = maxRight
  }

  if (axis.y > maxBottom) {
    axis.y = maxBottom
  }

  LayoutContainer.cropAxis = axis
  cropping.value = true
}

// 回弹截图框, 如果校验不通过那么截图框需要在指定时间弹回正常的位置

// 清除截图框
const clearCrop = () => {
  LayoutContainer.cropAxis = {
    x: 0,
    y: 0,
  }
  cropping.value = false
}

// 计算拖拽的 class 名
const computedClassDrag = (): string => {
  const className = ['cropper-drag-box']
  if (move.value && crop.value) {
    className.push('cropper-move')
  }

  if (crop.value) {
    className.push('cropper-crop')
  }

  if (cropping.value) {
    className.push('cropper-modal')
  }
  return className.join(' ')
}

// 计算截图框外层样式
const getCropBoxStyle = (): InterfaceTransformStyle => {
  const style = {
    width: `${LayoutContainer.cropLayout.width}px`,
    height: `${LayoutContainer.cropLayout.height}px`,
    transform: `translate3d(${LayoutContainer.cropAxis.x}px, ${LayoutContainer.cropAxis.y}px, 0)`,
  }
  LayoutContainer.cropExhibitionStyle.div = style
  return style
}

// 计算截图框图片的样式
const getCropImgStyle = (): InterfaceTransformStyle => {
  const scale = LayoutContainer.imgAxis.scale
  // 图片放大所带来的扩张坐标补充  加   图片坐标和截图坐标的差值
  const x =
    ((LayoutContainer.imgLayout.width * (scale - 1)) / 2 + (LayoutContainer.imgAxis.x - LayoutContainer.cropAxis.x)) / scale

  const y =
    ((LayoutContainer.imgLayout.height * (scale - 1)) / 2 + (LayoutContainer.imgAxis.y - LayoutContainer.cropAxis.y)) / scale
  const style = {
    width: `${LayoutContainer.imgLayout.width}px`,
    height: `${LayoutContainer.imgLayout.height}px`,
    transform: `scale(${scale}, ${scale}) translate3d(${x}px, ${y}px, 0) rotateZ(${LayoutContainer.imgAxis.rotate}deg)`,
  }
  LayoutContainer.cropExhibitionStyle.img = style
  return style
}

const slots = useSlots()

defineExpose({
  getCropData
})
</script>

<template>
  <section
    class="vue-cropper"
    :style="wrapper"
    ref="cropperRef"
    :onMouseover="mouseInCropper"
    :onMouseout="mouseOutCropper"
  >
    <section v-if="imgs" class="cropper-box cropper-fade-in">
      <section
        class="cropper-box-canvas"
        :style="LayoutContainer.imgExhibitionStyle"
      >
        <img :src="imgs" alt="vue-cropper" />
      </section>

      <section :class="computedClassDrag()" ref="cropperImg" />
    </section>
    <section
      v-if="cropping && imgs"
      class="cropper-crop-box cropper-fade-in"
      :style="getCropBoxStyle()"
    >
      <span class="cropper-view-box" :style="{outlineColor: cropColor}">
        <img v-if="img" :src="imgs" :style="getCropImgStyle()" alt="cropper-img" />
      </span>
      <span class="cropper-face cropper-move" ref="cropperBox" />
    </section>
    <section v-if="isDrag" class="drag">
      <slot name="drag">
        <p>拖动图片到此</p>
      </slot>
    </section>
    <cropperLoading :is-visible="imgLoading">
      <template v-if="slots.loading" #default>
        <slot name="loading"></slot>
      </template>
    </cropperLoading>
  </section>
</template>