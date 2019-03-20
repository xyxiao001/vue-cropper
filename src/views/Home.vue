<template>
  <div class="home">
    vue-cropper-next版本
    <vue-cropper :img="option.img"></vue-cropper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vueCropper from '../../lib/index'

@Component({
  data() {
    return {
      option: {
        img: 'http://cdn.xyxiao.cn/his-2019.jpg'
      }
    }
  },

  components: {
    vueCropper
  },

  mounted () {
  }
})
export default class Home extends Vue {

}
</script>
