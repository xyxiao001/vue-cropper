import VueCropper from './vue-cropper.vue'

const install = function(Vue) {
  Vue.createApp({}).component('VueCropper', VueCropper);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { VueCropper }

export default {
  version: '1.0.1',
  install,
  VueCropper,
}
