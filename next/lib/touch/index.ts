/**
 * TouchEvent 手势类库
 */

// 消息通知
import WatchEvent from '../watchEvents'
import { InterfaceMessageEvent, InterfaceAxis } from '../interface'

/**
 * 1. 单指 用于计算移动点的坐标距离
 * 2. 双指缩放
 *    计算前后两个点的连线距离然后计算缩放比例
 *    两个点的中心
 *    v = {
 *      x: t[1].x - t[0].x,
 *      y: t[1].y - t[0].y,
 *    }
 *    getLen(v) {
 *      return Math.sqrt(v.x * v.x + v.y * v.y);
 *    }
 *    scale = getLen(v) / getLen(pre)
 *    注： 可能需要根据节点大小 不同调整系数， 同时需要有个累加缩放过程
 * 3. 双指旋转
 *    利用内积， 求出两次手势变化的夹角， 用差乘(vector cross)正负来判断方向
 *    坐标原点为不动的那一根手指，计算变化的那根手指的角度
 *    v1: now v2: pre
 *    内积  r = (v1.x * v2.x + v1.y * v2.y ) / getLen(v1) * getLen(v2)
 *         r = r > 1 ? 1 : r
 *         angel = Math.acos(r);
 *    差乘  cross = v1.x * v2.y - v2.x * v1.y
 *    if  cross > 1  angel *=  -1
 *    angle * 180 / Math.PI
 */

// 当前设备是否判断是否支持touch事件
const SUPPORT_TOUCH = 'ontouchstart' in window
const SUPPORT_MOUSE = 'onmouseup' in window

class TouchEvent {
  // 默认配置属性
  element: HTMLElement
  pre: InterfaceAxis
  watcher: WatchEvent
  touches: TouchList
  constructor(element: HTMLElement) {
    // 节点
    this.element = element

    // 保存前一时刻的手指信息
    this.touches = null;

    this.pre = {
      x: 0,
      y: 0,
    }

    this.watcher = new WatchEvent()
  }
  getAxis(event: MouseEvent): InterfaceAxis {
    const axis = {
      x: 0,
      y: 0,
    }
    axis.x = event.clientX
    axis.y = event.clientY
    return axis
  }

  start(event: MouseEvent) {
    event.preventDefault()
    // 只有鼠标左键才触发
    if (event.which !== 1) {
      return
    }
    // 鼠标按下去或者手按下去
    this.pre = this.getAxis(event)
    this.watcher.fire({
      type: 'down',
      event,
    })
    window.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.stop)
    // console.log('down')
  }

  startTouch(event: TouchEvent) {
    // 鼠标按下去或者手按下去
    const x = event.touches[0].clientX
    const y = event.touches[0].clientY
    this.pre = {
      x,
      y,
    }
    this.watcher.fire({
      type: 'down',
      event,
    })
    // 表示是两个手指放上去那么直接开始，检测双指
    if (event.touches.length === 2) {
      this.touches = event.touches
      window.addEventListener('touchmove', this.scaleTouch)
      window.removeEventListener('touchmove', this.moveTouch)
    } else {
      window.addEventListener('touchmove', this.moveTouch)
      window.removeEventListener('touchmove', this.scaleTouch)
    }
    window.addEventListener('touchend', this.stopTouch)
  }

  move(event: MouseEvent) {
    event.preventDefault()
    const nowAxis = this.getAxis(event)
    this.watcher.fire({
      type: 'down-to-move',
      event,
      change: {
        x: nowAxis.x - this.pre.x,
        y: nowAxis.y - this.pre.y,
      },
    })
    this.pre = {
      x: event.clientX,
      y: event.clientY,
    }
    // console.log('move')
  }

  moveTouch(event: TouchEvent) {
    event.preventDefault()
    // 鼠标按下去或者手按下去
    const x = event.touches[0].clientX
    const y = event.touches[0].clientY
    this.watcher.fire({
      type: 'down-to-move',
      event,
      change: {
        x: x - this.pre.x,
        y: y - this.pre.y,
      },
    })
    this.pre = {
      x,
      y,
    }
  }

  // 获取连线中心点
  getLen(touches: InterfaceAxis): Number {
    return Math.sqrt(touches.x * touches.x + touches.y * touches.y);
  }

  getScale(cur: TouchList[], pre: TouchList[]): Number {
    const curCenter = {
      x: cur[1].clientX - cur[0].clientX,
      y: cur[1].clientY - cur[0].clientX,
    }
    const preCenter = {
      x: pre[1].clientX - pre[0].clientX,
      y: pre[1].clientY - pre[0].clientX,
    }
    return this.getLen(curCenter) / this.getLen(preCenter)
  }

  // 双指缩放
  scaleTouch(event: MouseEvent) {
    event.preventDefault()
    const scale = this.getScale(event.touches, this.touches);
    // 返回两个手指直接的差值
    this.watcher.fire({
      type: 'down-to-scale',
      event,
      scale,
    })
    this.touches = event.touches
  }

  stop(event: MouseEvent) {
    this.watcher.fire({
      type: 'up',
      event,
    })
    // console.log('stop')
    window.removeEventListener('mousemove', this.move)
    window.removeEventListener('mouseup', this.stop)
  }

  stopTouch(event: TouchEvent) {
    this.watcher.fire({
      type: 'up',
      event,
    })
    window.removeEventListener('touchmove', this.moveTouch)
    window.removeEventListener('touchmove', this.scaleTouch)
    window.removeEventListener('touchend', this.stopTouch)
  }

  // 绑定事件
  on(type: string, handler: (message: InterfaceMessageEvent) => void) {
    this.watcher.addHandler(type, handler)
    if (type === 'down-to-move') {
      if (SUPPORT_MOUSE) {
        // 绑定监听事件的this
        this.start = this.start.bind(this)
        this.move = this.move.bind(this)
        this.stop = this.stop.bind(this)
        this.element.addEventListener('mousedown', this.start)
      }
      if (SUPPORT_TOUCH) {
        this.startTouch = this.startTouch.bind(this)
        this.moveTouch = this.moveTouch.bind(this)
        this.scaleTouch = this.scaleTouch.bind(this)
        this.stopTouch = this.stopTouch.bind(this)
        this.move = this.move.bind(this)
        this.stop = this.stop.bind(this)
        this.element.addEventListener('touchstart', this.startTouch)
      }
      return
    }
  }
  // 解绑事件
  off(type: string, handler: (message: InterfaceMessageEvent) => void) {
    this.watcher.removeHandler(type, handler)
    if (type === 'down-to-move') {
      if (SUPPORT_MOUSE) {
        // 绑定监听事件的this
        this.element.removeEventListener('mousedown', this.start)
      }
      if (SUPPORT_TOUCH) {
        this.element.removeEventListener('touchstart', this.startTouch)
      }
      return
    }
  }
}

export default TouchEvent
