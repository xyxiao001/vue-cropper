import VueCropper from './vue-cropper.vue'
import type { vueCropperGlobal } from './typings'
import type { App } from 'vue';

const install = function(app: App) {
  app.component('VueCropper', VueCropper)
}

export const globalCropper: vueCropperGlobal = {
  version: '1.1.1',
  install,
  VueCropper,
}

export { VueCropper }

export default globalCropper
