import VueCropper from './vue-cropper.vue'
import type { vueCropperGlobal } from './typings'

const install = function(Vue: any) {
  Vue.component('VueCropper', VueCropper)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.createApp({}).component('VueCropper', VueCropper);
}


export const globalCropper: vueCropperGlobal = {
  version: '1.0.5',
  install,
  VueCropper,
}

export { VueCropper }

export default globalCropper
