import VueCropper from './vue-cropper.vue'
import type { vueCropperGlobal } from './typings'

const install = function(Vue: any) {
  Vue.component('VueCropper', VueCropper)
}

// 兼容性处理
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (fn: Function) => {
    return setTimeout(fn, 17)
  }
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = id => {
    clearTimeout(id)
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.createApp({}).component('VueCropper', VueCropper);
}


export const globalCropper: vueCropperGlobal = {
  version: '1.0.3',
  install,
  VueCropper,
}

export { VueCropper }

export default globalCropper
