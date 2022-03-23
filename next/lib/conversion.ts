class Conversion {
  ctx: CanvasRenderingContext2D | null
  img: HTMLImageElement | null
  handle: any
  constructor() {
    this.ctx = null
    this.img = null

    /*
    参数	0行（未旋转上）	0列（未旋转左）	旋转（方法很多）
    1	上	左	0°
    2	上	右	水平翻转
    3	下	右	180°
    4	下	左	垂直翻转
    5	左	上	顺时针90°+水平翻转
    6	右	上	顺时针90°
    7	右	下	顺时针90°+垂直翻转
    8	左	下	逆时针90°
    */
    this.handle = {
      1: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.width
          canvas.height = this.img.height
        }
        return canvas
      },

      2: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.width
          canvas.height = this.img.height
          this.ctx.translate(this.img.width, 0)
          this.ctx.scale(-1, 1)
        }
        return canvas
      },

      3: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.width
          canvas.height = this.img.height
          // 180
          this.ctx.translate(this.img.width / 2, this.img.height / 2)
          this.ctx.rotate((180 * Math.PI) / 180)
          this.ctx.translate(-this.img.width / 2, -this.img.height / 2)
        }
        return canvas
      },
      4: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.width
          canvas.height = this.img.height
          this.ctx.translate(0, this.img.height)
          this.ctx.scale(1, -1)
        }
        return canvas
      },
      5: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.height
          canvas.height = this.img.width
          this.ctx.rotate(0.5 * Math.PI)
          this.ctx.scale(1, -1)
        }
        return canvas
      },
      6: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.height
          canvas.height = this.img.width
          this.ctx.translate(this.img.height / 2, this.img.width / 2)
          this.ctx.rotate((90 * Math.PI) / 180)
          this.ctx.translate(-this.img.width / 2, -this.img.height / 2)
        }
        return canvas
      },
      7: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.height
          canvas.height = this.img.width
          this.ctx.rotate(0.5 * Math.PI)
          this.ctx.translate(this.img.width, -this.img.height)
          this.ctx.scale(-1, 1)
        }
        return canvas
      },
      8: (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        if (canvas && this.ctx && this.img) {
          canvas.width = this.img.height
          canvas.height = this.img.width
          // -90
          this.ctx.translate(this.img.height / 2, this.img.width / 2)
          this.ctx.rotate((-90 * Math.PI) / 180)
          this.ctx.translate(-this.img.width / 2, -this.img.height / 2)
        }
        return canvas
      },
    }
  }

  render(img: HTMLImageElement, canvas: HTMLCanvasElement, orientation: number) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.img = img
    if (this.handle[orientation]) {
      const curCanvas = this.handle[orientation](canvas)
      this.ctx = curCanvas.getContext('2d') as CanvasRenderingContext2D
      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height)
      return curCanvas
    } else {
      canvas.width = img.width
      canvas.height = img.height
      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height)
      return canvas
    }
  }
}

export default Conversion
