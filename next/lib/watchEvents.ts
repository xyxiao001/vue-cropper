/**
 * WatchEvent 消息通知
 */
import { InterfaceMessageEvent } from './interface'

class WatchEvent {
  handlers: Map<string, Array<(message: InterfaceMessageEvent) => void>>
  constructor() {
    this.handlers = new Map()
  }

  addHandler(type: string, handler: (message: InterfaceMessageEvent) => void) {
    const res: Array<(message: InterfaceMessageEvent) => void> | undefined = this.handlers.get(type)
    let arr: Array<(message: InterfaceMessageEvent) => void> = []
    if (res) {
      arr = [...res]
    }
    arr.push(handler)
    this.handlers.set(type, arr)
  }

  fire(event: InterfaceMessageEvent) {
    const res: Array<(message: InterfaceMessageEvent) => void> | undefined = this.handlers.get(
      event.type,
    )
    if (!res) {
      return
    }
    res.forEach((func: (event: InterfaceMessageEvent) => void) => {
      func(event)
    })
  }

  removeHandler(type: string, handler: (message: InterfaceMessageEvent) => void) {
    const res: Array<(message: InterfaceMessageEvent) => void> | undefined = this.handlers.get(type)
    if (!res) {
      return
    }
    let i = 0
    for (const len = res.length; i < len; i++) {
      if (res[i] === handler) {
        break
      }
    }
    res.splice(i, 1)
    this.handlers.set(type, res)
  }
}

export default WatchEvent
