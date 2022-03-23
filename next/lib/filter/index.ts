// 滤镜

// 灰度滤镜
const grayscale = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  let gray: number = 0
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
  let imgData: any = []
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  } catch (e) {
    console.error(e)
    return canvas
  }
  for (let i = 0; i < canvas.width * canvas.height * 4; i += 4) {
    const r: number = imgData.data[i]
    const g: number = imgData.data[i + 1]
    const b: number = imgData.data[i + 2]
    gray = ~~(0.2989 * r + 0.587 * g + 0.114 * b)
    imgData.data[i] = gray
    imgData.data[i + 1] = gray
    imgData.data[i + 2] = gray
  }
  ctx.putImageData(imgData, 0, 0)
  return canvas
}

// 黑白
const blackAndWhite = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  // 获取图片的像素点 rgba
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
  let imgData: any = []
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  } catch (e) {
    console.error(e)
    return canvas
  }
  let gray: number = 0
  let i = 0
  while (i < canvas.width * canvas.height * 4) {
    const r: number = imgData.data[i]
    const g: number = imgData.data[i + 1]
    const b: number = imgData.data[i + 2]
    gray = ~~(0.2989 * r + 0.587 * g + 0.114 * b) > 128 ? 255 : 0
    imgData.data[i] = gray
    imgData.data[i + 1] = gray
    imgData.data[i + 2] = gray
    i += 4
  }
  ctx.putImageData(imgData, 0, 0)
  return canvas
}

// 老照片算法

const oldPhoto = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  // 获取图片的像素点 rgba
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
  let imgData: any = []
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  } catch (e) {
    console.error(e)
    return canvas
  }
  let i = 0
  while (i < canvas.width * canvas.height * 4) {
    const r: number = imgData.data[i]
    const g: number = imgData.data[i + 1]
    const b: number = imgData.data[i + 2]
    imgData.data[i] = 0.393 * r + 0.769 * g + 0.189 * b
    imgData.data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b
    imgData.data[i + 2] = 0.272 * r + 0.543 * g + 0.131 * b
    i += 4
  }
  ctx.putImageData(imgData, 0, 0)
  return canvas
}

export { grayscale, blackAndWhite, oldPhoto }
