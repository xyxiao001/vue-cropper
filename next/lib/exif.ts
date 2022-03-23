const Exif: any = {}
Exif.getData = (img: HTMLImageElement) =>
  new Promise((resolve, reject) => {
    let obj: any = {}
    getImageData(img)
      .then((data: any) => {
        obj.arrayBuffer = data
        obj.orientation = getOrientation(data)
        resolve(obj)
      })
      .catch(error => {
        reject(error)
      })
  })

// 这里的获取exif要将图片转ArrayBuffer对象，这里假设获取了图片的baes64
// 步骤一
// base64转ArrayBuffer对象
function getImageData(img: HTMLImageElement) {
  let data = null
  return new Promise((resolve, reject) => {
    if (img.src) {
      if (/^data\:/i.test(img.src)) {
        // Data URI
        data = base64ToArrayBuffer(img.src)
        resolve(data)
      } else if (/^blob\:/i.test(img.src)) {
        // Object URL
        var fileReader = new FileReader()
        fileReader.onload = function(e: any) {
          data = e.target.result
          resolve(data)
        }
        objectURLToBlob(img.src, function(blob: Blob) {
          fileReader.readAsArrayBuffer(blob)
        })
      } else {
        var http: any = new XMLHttpRequest()
        http.onload = function() {
          if (this.status == 200 || this.status === 0) {
            data = http.response
            resolve(data)
          } else {
            throw 'Could not load image'
          }
          http = null
        }
        http.open('GET', img.src, true)
        http.responseType = 'arraybuffer'
        http.send(null)
      }
    } else {
      reject('img error')
    }
  })
}

function objectURLToBlob(url: string, callback: Function) {
  var http = new XMLHttpRequest()
  http.open('GET', url, true)
  http.responseType = 'blob'
  http.onload = function(e) {
    if (this.status == 200 || this.status === 0) {
      callback(this.response)
    }
  }
  http.send()
}

function base64ToArrayBuffer(base64: string) {
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, '')
  var binary = atob(base64)
  var len = binary.length
  var buffer = new ArrayBuffer(len)
  var view = new Uint8Array(buffer)
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i)
  }
  return buffer
}
// 步骤二，Unicode码转字符串
// ArrayBuffer对象 Unicode码转字符串
function getStringFromCharCode(dataView: any, start: number, length: number) {
  var str = ''
  var i
  for (i = start, length += start; i < length; i++) {
    str += String.fromCharCode(dataView.getUint8(i))
  }
  return str
}

// 步骤三，获取jpg图片的exif的角度（在ios体现最明显）
function getOrientation(arrayBuffer: ArrayBuffer) {
  var dataView = new DataView(arrayBuffer)
  var length = dataView.byteLength
  var orientation
  var exifIDCode
  var tiffOffset
  var firstIFDOffset
  var littleEndian
  var endianness
  var app1Start
  var ifdStart
  var offset
  var i
  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xff && dataView.getUint8(1) === 0xd8) {
    offset = 2
    while (offset < length) {
      if (dataView.getUint8(offset) === 0xff && dataView.getUint8(offset + 1) === 0xe1) {
        app1Start = offset
        break
      }
      offset++
    }
  }
  if (app1Start) {
    exifIDCode = app1Start + 4
    tiffOffset = app1Start + 10
    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset)
      littleEndian = endianness === 0x4949

      if (littleEndian || endianness === 0x4d4d /* bigEndian */) {
        if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002a) {
          firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian)

          if (firstIFDOffset >= 0x00000008) {
            ifdStart = tiffOffset + firstIFDOffset
          }
        }
      }
    }
  }
  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian)

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2
      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
        // 8 is the offset of the current tag's value
        offset += 8

        // Get the original orientation value
        orientation = dataView.getUint16(offset, littleEndian)

        // Override the orientation with its default value for Safari (#120)
        // if (IS_SAFARI_OR_UIWEBVIEW) {
        //   dataView.setUint16(offset, 1, littleEndian);
        // }
        break
      }
    }
  }
  return orientation
}
export default Exif
