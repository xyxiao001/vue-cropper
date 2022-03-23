import { InterfaceLayoutStyle, InterfaceModeHandle } from './interface'

const layout = (
  imgStyle: InterfaceLayoutStyle,
  layoutStyle: InterfaceLayoutStyle,
  mode: keyof InterfaceModeHandle,
): number => {
  // 返回图片缩放大小，以及图片基于容器的坐标点
  let handleType: keyof InterfaceModeHandle = 'default'
  for (const key of Object.keys(modeHandle)) {
    if (key === mode) {
      handleType = mode
      break
    }
  }
  const handle = modeHandle[handleType]
  return handle(imgStyle, layoutStyle, mode)
}

const modeHandle = {
  contain: (
    imgStyle: InterfaceLayoutStyle,
    layoutStyle: InterfaceLayoutStyle,
    mode: string,
  ): number => {
    // contain 布局 图片需要在容器内展示， 默认是容器的 80%, 不会自己放大
    let scale = 1
    const { width, height } = { ...imgStyle }
    const wrapWidth = layoutStyle.width
    const wrapHeight = layoutStyle.height

    // 先按照宽度布局
    if (width > wrapWidth) {
      // 如果图片宽度大于容器宽度
      scale = wrapWidth / width
    }
    if (height * scale > wrapHeight) {
      scale = wrapHeight / height
    }
    return scale
  },
  cover: (
    imgStyle: InterfaceLayoutStyle,
    layoutStyle: InterfaceLayoutStyle,
    mode: string,
  ): number => {
    // cover布局, 图片会变成铺满容器， 默认先铺宽，然后铺高度
    let scale = 1
    const { width, height } = { ...imgStyle }
    const wrapWidth = layoutStyle.width
    const wrapHeight = layoutStyle.height

    scale = wrapWidth / width
    const curHeight = height * scale
    // 如果扩展之后高度小于容器的外层高度 继续扩展高度
    if (curHeight < wrapHeight) {
      scale = wrapHeight / height
    }
    return scale
  },
  default: (
    imgStyle: InterfaceLayoutStyle,
    layoutStyle: InterfaceLayoutStyle,
    mode: string,
  ): number => {
    let scale = 1
    // 原始图片比例渲染
    if (mode === 'original') {
      return scale
    }
    let { width, height } = { ...imgStyle }
    const wrapWidth = layoutStyle.width
    const wrapHeight = layoutStyle.height
    const arr = mode.split(' ')
    try {
      let str = arr[0]
      if (str.search('px') !== -1) {
        str = str.replace('px', '')
        width = parseFloat(str)
        scale = width / imgStyle.width
      }

      if (str.search('%') !== -1) {
        str = str.replace('%', '')
        width = (parseFloat(str) / 100) * wrapWidth
        scale = width / imgStyle.width
      }

      if (arr.length === 2 && str === 'auto') {
        let str2 = arr[1]

        if (str2.search('px') !== -1) {
          str2 = str2.replace('px', '')
          height = parseFloat(str2)
          scale = height / imgStyle.height
        }
        if (str2.search('%') !== -1) {
          str2 = str2.replace('%', '')
          height = (parseFloat(str2) / 100) * wrapHeight
          scale = height / imgStyle.height
        }
      }
    } catch (e) {
      console.error(e)
      scale = 1
    }

    return scale
  },
}

export default layout
