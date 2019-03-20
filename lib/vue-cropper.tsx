import { Component, Model, Prop, Watch, Vue, Emit } from 'vue-property-decorator'

import './style/index.scss'

@Component({
  data() {
    return {
      imgs: ''
    }
  },
})

export default class VueCropper extends Vue {
  // 图片属性
  @Prop({
    default: '',
    type: String,
  })
  img!: string

  @Watch('img')
  onImgChanged(val: string, oldVal: string) {
    if (val) {
      this.checkedImg(val)
    }
  }

  $refs!: {
    canvas: HTMLCanvasElement
  }

  created (): void {
    if (this.img) {
      this.checkedImg(this.img)
    }
  }

  @Emit()
  imgLoad (status: string):string {
    return status
  }

  // 检查图片
  checkedImg  = async (url: string) => {
    try {
      await this.loadImg(url)
      this.imgLoad('success')
    } catch (error) {
      this.imgLoad(error)
    }
    console.log(1)
  }

  // 加载图片
  loadImg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  render() {
    return (
      <section class="vue-cropper">
        <canvas class="cropper-canvas" ref="canvas"></canvas>
      </section>
    )
  }
}