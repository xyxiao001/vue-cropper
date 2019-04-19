<template>
  <div class="home">
    vue-cropper-next版本
    <vue-cropper
      :img="option.img"
      :wrapper="option.wrapper"
    ></vue-cropper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vueCropper from '../../lib/index'

@Component({
  components: {
    vueCropper,
  },
})
export default class Home extends Vue {
  option = {
    img: 'http://cdn.xyxiao.cn/bg10.jpg',
    wrapper: {
      width: 500,
      height: 500,
    },
  }
}
</script>
