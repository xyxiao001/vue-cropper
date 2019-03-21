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
    let img:HTMLImageElement
    try {
      img = await this.loadImg(url)
      this.imgLoad('success')
    } catch (error) {
      this.imgLoad(error)
      console.log('img load error')
      return false      
    }
    console.log('img load success')
    // 图片加载成功之后的操作
    // CanvasRenderingContext2D
    const ctx:any = this.$refs.canvas.getContext('2d')
    this.$refs.canvas.width = img.width
    this.$refs.canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return true
  }

  // 加载图片
  loadImg = async (url: string):Promise<HTMLImageElement> => {
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