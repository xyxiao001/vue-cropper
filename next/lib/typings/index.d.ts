import VueCropper from '../vue-cropper.vue'
import { globalCropper } from '../index'
export interface vueCropperGlobal {
  version: string,
  install: (app: any, ...options: any[]) => any,
  VueCropper: typeof VueCropper
}

declare global {
  interface Window { 
    Vue: any
  }
}

export {
  VueCropper
}

export default globalCropper