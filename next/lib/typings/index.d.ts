import VueCropper from '../vue-cropper.vue'
import { globalCropper } from '../index'
import type { App } from 'vue';
export interface vueCropperGlobal {
  version: string,
  install: (app: App) => void,
  VueCropper: typeof VueCropper
}

export {
  VueCropper
}

export default globalCropper