import { InterfaceLayoutStyle } from './interface'

// 当前是否在缩放
let scaling = false

// 图片放大还是缩小
// 当前变化系数 1px像素大小对应 - 0.2
let coe = 0.2
let coeStatus = ''

// 火狐的变化量需要单独处理
const isFirefox = navigator.userAgent.indexOf('Firefox') > -1

// 取得浏览器的userAgent字符
export const isIE = !!window.ActiveXObject || 'ActiveXObject' in window

export const changeImgSize = (e: any, scale: number, imgStyle: InterfaceLayoutStyle): number => {
  // 获取到变化量
  let change = e.deltaY || e.wheelDelta
  let nowScale: number = scale
  if (isFirefox) {
    change = change * 30
  }
  if (isIE) {
    change = -change
  }
  // 当前变化系数 1px像素大小对应 - 0.2
  const nowCoe =
    coe / imgStyle.width > coe / imgStyle.width ? coe / imgStyle.width : coe / imgStyle.width
  const num = nowCoe * change

  if (num < 0) {
    nowScale += Math.abs(num)
  }

  if (num > 0 && scale > Math.abs(num)) {
    nowScale -= Math.abs(num)
  }

  // 延迟0.1s 每次放大大或者缩小的范围
  const status = num < 0 ? 'add' : 'reduce'
  if (status !== coeStatus) {
    coeStatus = status
    coe = 0.2
  }

  if (!scaling) {
    const set = setTimeout(() => {
      scaling = false
      coe += 0.01
    }, 100)
  }
  scaling = true
  return nowScale
}

export const supportWheel = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'
