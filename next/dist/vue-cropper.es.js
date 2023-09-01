import { defineComponent as M, openBlock as C, createElementBlock as x, withDirectives as O, createElementVNode as v, normalizeStyle as y, vShow as X, createCommentVNode as b, normalizeClass as S, toDisplayString as H } from "vue";
const Y = {};
Y.getData = (t) => new Promise((e, i) => {
  let s = {};
  I(t).then((r) => {
    s.arrayBuffer = r;
    try {
      s.orientation = T(r);
    } catch {
      s.orientation = -1;
    }
    e(s);
  }).catch((r) => {
    i(r);
  });
});
function I(t) {
  let e = null;
  return new Promise((i, s) => {
    if (t.src)
      if (/^data\:/i.test(t.src))
        e = L(t.src), i(e);
      else if (/^blob\:/i.test(t.src)) {
        var r = new FileReader();
        r.onload = function(h) {
          e = h.target.result, i(e);
        }, E(t.src, function(h) {
          r.readAsArrayBuffer(h);
        });
      } else {
        var o = new XMLHttpRequest();
        o.onload = function() {
          if (this.status == 200 || this.status === 0)
            e = o.response, i(e);
          else
            throw "Could not load image";
          o = null;
        }, o.open("GET", t.src, !0), o.responseType = "arraybuffer", o.send(null);
      }
    else
      s("img error");
  });
}
function E(t, e) {
  var i = new XMLHttpRequest();
  i.open("GET", t, !0), i.responseType = "blob", i.onload = function(s) {
    (this.status == 200 || this.status === 0) && e(this.response);
  }, i.send();
}
function L(t, e) {
  e = e || t.match(/^data\:([^\;]+)\;base64,/mi)[1] || "", t = t.replace(/^data\:([^\;]+)\;base64,/gmi, "");
  for (var i = atob(t), s = i.length, r = new ArrayBuffer(s), o = new Uint16Array(r), h = 0; h < s; h++)
    o[h] = i.charCodeAt(h);
  return r;
}
function k(t, e, i) {
  var s = "", r;
  for (r = e, i += e; r < i; r++)
    s += String.fromCharCode(t.getUint8(r));
  return s;
}
function T(t) {
  var e = new DataView(t), i = e.byteLength, s, r, o, h, n, l, c, a, p, f;
  if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
    for (p = 2; p < i; ) {
      if (e.getUint8(p) === 255 && e.getUint8(p + 1) === 225) {
        c = p;
        break;
      }
      p++;
    }
  if (c && (r = c + 4, o = c + 10, k(e, r, 4) === "Exif" && (l = e.getUint16(o), n = l === 18761, (n || l === 19789) && e.getUint16(o + 2, n) === 42 && (h = e.getUint32(o + 4, n), h >= 8 && (a = o + h)))), a) {
    for (i = e.getUint16(a, n), f = 0; f < i; f++)
      if (p = a + f * 12 + 2, e.getUint16(p, n) === 274) {
        p += 8, s = e.getUint16(p, n);
        break;
      }
  }
  return s;
}
const N = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, r] of e)
    i[s] = r;
  return i;
}, A = M({
  data: function() {
    return {
      // 容器高宽
      w: 0,
      h: 0,
      // 图片缩放比例
      scale: 1,
      // 图片偏移x轴
      x: 0,
      // 图片偏移y轴
      y: 0,
      // 图片加载
      loading: !0,
      // 图片真实宽度
      trueWidth: 0,
      // 图片真实高度
      trueHeight: 0,
      move: !0,
      // 移动的x
      moveX: 0,
      // 移动的y
      moveY: 0,
      // 开启截图
      crop: !1,
      // 正在截图
      cropping: !1,
      // 裁剪框大小
      cropW: 0,
      cropH: 0,
      cropOldW: 0,
      cropOldH: 0,
      // 判断是否能够改变
      canChangeX: !1,
      canChangeY: !1,
      // 改变的基准点
      changeCropTypeX: 1,
      changeCropTypeY: 1,
      // 裁剪框的坐标轴
      cropX: 0,
      cropY: 0,
      cropChangeX: 0,
      cropChangeY: 0,
      cropOffsertX: 0,
      cropOffsertY: 0,
      // 支持的滚动事件
      support: "",
      // 移动端手指缩放
      touches: [],
      touchNow: !1,
      // 图片旋转
      rotate: 0,
      isIos: !1,
      orientation: 0,
      imgs: "",
      // 图片缩放系数
      coe: 0.2,
      // 是否正在多次缩放
      scaling: !1,
      scalingSet: "",
      coeStatus: "",
      // 控制emit触发频率
      isCanShow: !0
    };
  },
  props: {
    img: {
      type: [String, Blob, null, File],
      default: ""
    },
    // 输出图片压缩比
    outputSize: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: "jpeg"
    },
    info: {
      type: Boolean,
      default: !0
    },
    // 是否开启滚轮放大缩小
    canScale: {
      type: Boolean,
      default: !0
    },
    // 是否自成截图框
    autoCrop: {
      type: Boolean,
      default: !1
    },
    autoCropWidth: {
      type: [Number, String],
      default: 0
    },
    autoCropHeight: {
      type: [Number, String],
      default: 0
    },
    // 是否开启固定宽高比
    fixed: {
      type: Boolean,
      default: !1
    },
    // 宽高比 w/h
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    },
    // 固定大小 禁止改变截图框大小
    fixedBox: {
      type: Boolean,
      default: !1
    },
    // 输出截图是否缩放
    full: {
      type: Boolean,
      default: !1
    },
    // 是否可以拖动图片
    canMove: {
      type: Boolean,
      default: !0
    },
    // 是否可以拖动截图框
    canMoveBox: {
      type: Boolean,
      default: !0
    },
    // 上传图片按照原始比例显示
    original: {
      type: Boolean,
      default: !1
    },
    // 截图框能否超过图片
    centerBox: {
      type: Boolean,
      default: !1
    },
    // 是否根据dpr输出高清图片
    high: {
      type: Boolean,
      default: !0
    },
    // 截图框展示宽高类型
    infoTrue: {
      type: Boolean,
      default: !1
    },
    // 可以压缩图片宽高  默认不超过200
    maxImgSize: {
      type: [Number, String],
      default: 2e3
    },
    // 倍数  可渲染当前截图框的n倍 0 - 1000;
    enlarge: {
      type: [Number, String],
      default: 1
    },
    // 自动预览的固定宽度
    preW: {
      type: [Number, String],
      default: 0
    },
    /*
      图片布局方式 mode 实现和css背景一样的效果
      contain  居中布局 默认不会缩放 保证图片在容器里面 mode: 'contain'
      cover    拉伸布局 填充整个容器  mode: 'cover'
      如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为auto。 mode: '50px'
      如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。 mode: '50px 60px'
    */
    mode: {
      type: String,
      default: "contain"
    },
    //限制最小区域,可传1以上的数字和字符串，限制长宽都是这么大
    // 也可以传数组[90,90] 
    limitMinSize: {
      type: [Number, Array, String],
      default: () => 10,
      validator: function(t) {
        return Array.isArray(t) ? Number(t[0]) >= 0 && Number(t[1]) >= 0 : Number(t) >= 0;
      }
    },
    // 导出时,填充背景颜色
    fillColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    cropInfo() {
      let t = {};
      if (t.top = this.cropOffsertY > 21 ? "-21px" : "0px", t.width = this.cropW > 0 ? this.cropW : 0, t.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
        let e = 1;
        this.high && !this.full && (e = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (e = Math.abs(Number(this.enlarge))), t.width = t.width * e, t.height = t.height * e, this.full && (t.width = t.width / this.scale, t.height = t.height / this.scale);
      }
      return t.width = t.width.toFixed(0), t.height = t.height.toFixed(0), t;
    },
    isIE() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    passive() {
      return this.isIE ? null : {
        passive: !1
      };
    }
  },
  watch: {
    // 如果图片改变， 重新布局
    img() {
      this.checkedImg();
    },
    imgs(t) {
      t !== "" && this.reload();
    },
    cropW() {
      this.showPreview();
    },
    cropH() {
      this.showPreview();
    },
    cropOffsertX() {
      this.showPreview();
    },
    cropOffsertY() {
      this.showPreview();
    },
    scale(t, e) {
      this.showPreview();
    },
    x() {
      this.showPreview();
    },
    y() {
      this.showPreview();
    },
    autoCrop(t) {
      t && this.goAutoCrop();
    },
    // 修改了自动截图框
    autoCropWidth() {
      this.autoCrop && this.goAutoCrop();
    },
    autoCropHeight() {
      this.autoCrop && this.goAutoCrop();
    },
    mode() {
      this.checkedImg();
    },
    rotate() {
      this.showPreview(), this.autoCrop ? this.goAutoCrop(this.cropW, this.cropH) : (this.cropW > 0 || this.cropH > 0) && this.goAutoCrop(this.cropW, this.cropH);
    }
  },
  methods: {
    getVersion(t) {
      var e = navigator.userAgent.split(" "), i = "";
      let s = 0;
      const r = new RegExp(t, "i");
      for (var o = 0; o < e.length; o++)
        r.test(e[o]) && (i = e[o]);
      return i ? s = i.split("/")[1].split(".") : s = ["0", "0", "0"], s;
    },
    checkOrientationImage(t, e, i, s) {
      if (this.getVersion("chrome")[0] >= 81)
        e = -1;
      else if (this.getVersion("safari")[0] >= 605) {
        const h = this.getVersion("version");
        h[0] > 13 && h[1] > 1 && (e = -1);
      } else {
        const h = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
        if (h) {
          let n = h[1];
          n = n.split("_"), (n[0] > 13 || n[0] >= 13 && n[1] >= 4) && (e = -1);
        }
      }
      let r = document.createElement("canvas"), o = r.getContext("2d");
      switch (o.save(), e) {
        case 2:
          r.width = i, r.height = s, o.translate(i, 0), o.scale(-1, 1);
          break;
        case 3:
          r.width = i, r.height = s, o.translate(i / 2, s / 2), o.rotate(180 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 4:
          r.width = i, r.height = s, o.translate(0, s), o.scale(1, -1);
          break;
        case 5:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.scale(1, -1);
          break;
        case 6:
          r.width = s, r.height = i, o.translate(s / 2, i / 2), o.rotate(90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 7:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.translate(i, -s), o.scale(-1, 1);
          break;
        case 8:
          r.height = i, r.width = s, o.translate(s / 2, i / 2), o.rotate(-90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        default:
          r.width = i, r.height = s;
      }
      o.drawImage(t, 0, 0, i, s), o.restore(), r.toBlob(
        (h) => {
          let n = URL.createObjectURL(h);
          URL.revokeObjectURL(this.imgs), this.imgs = n;
        },
        "image/" + this.outputType,
        1
      );
    },
    // checkout img
    checkedImg() {
      if (this.img === null || this.img === "") {
        this.imgs = "", this.clearCrop();
        return;
      }
      this.loading = !0, this.scale = 1, this.rotate = 0, this.clearCrop();
      let t = new Image();
      if (t.onload = () => {
        if (this.img === "")
          return this.$emit("img-load", new Error("图片不能为空")), !1;
        let i = t.width, s = t.height;
        Y.getData(t).then((r) => {
          this.orientation = r.orientation || 1;
          let o = Number(this.maxImgSize);
          if (!this.orientation && i < o & s < o) {
            this.imgs = this.img;
            return;
          }
          i > o && (s = s / i * o, i = o), s > o && (i = i / s * o, s = o), this.checkOrientationImage(t, this.orientation, i, s);
        }).catch((r) => {
          this.$emit("img-load", "error"), this.$emit("img-load-error", r);
        });
      }, t.onerror = (i) => {
        this.$emit("img-load", "error"), this.$emit("img-load-error", i);
      }, this.img.substr(0, 4) !== "data" && (t.crossOrigin = ""), this.isIE) {
        var e = new XMLHttpRequest();
        e.onload = function() {
          var i = URL.createObjectURL(this.response);
          t.src = i;
        }, e.open("GET", this.img, !0), e.responseType = "blob", e.send();
      } else
        t.src = this.img;
    },
    // 当按下鼠标键
    startMove(t) {
      if (t.preventDefault(), this.move && !this.crop) {
        if (!this.canMove)
          return !1;
        this.moveX = ("clientX" in t ? t.clientX : t.touches[0].clientX) - this.x, this.moveY = ("clientY" in t ? t.clientY : t.touches[0].clientY) - this.y, t.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), t.touches.length == 2 && (this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("img-moving", {
          moving: !0,
          axis: this.getImgAxis()
        });
      } else
        this.cropping = !0, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = t.offsetX ? t.offsetX : t.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = t.offsetY ? t.offsetY : t.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0;
    },
    // 移动端缩放
    touchScale(t) {
      t.preventDefault();
      let e = this.scale;
      var i = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      }, s = {
        x: t.touches[0].clientX,
        y: t.touches[0].clientY
      }, r = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      }, o = {
        x: t.touches[1].clientX,
        y: t.touches[1].clientY
      }, h = Math.sqrt(
        Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)
      ), n = Math.sqrt(
        Math.pow(s.x - o.x, 2) + Math.pow(s.y - o.y, 2)
      ), l = n - h, c = 1;
      c = c / this.trueWidth > c / this.trueHeight ? c / this.trueHeight : c / this.trueWidth, c = c > 0.1 ? 0.1 : c;
      var a = c * l;
      if (!this.touchNow) {
        if (this.touchNow = !0, l > 0 ? e += Math.abs(a) : l < 0 && e > Math.abs(a) && (e -= Math.abs(a)), this.touches = t.touches, setTimeout(() => {
          this.touchNow = !1;
        }, 8), !this.checkoutImgAxis(this.x, this.y, e))
          return !1;
        this.scale = e;
      }
    },
    cancelTouchScale(t) {
      window.removeEventListener("touchmove", this.touchScale);
    },
    // 移动图片
    moveImg(t) {
      if (t.preventDefault(), t.touches && t.touches.length === 2)
        return this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale), window.removeEventListener("touchmove", this.moveImg), !1;
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.moveX, r = i - this.moveY, this.$nextTick(() => {
        if (this.centerBox) {
          let o = this.getImgAxis(s, r, this.scale), h = this.getCropAxis(), n = this.trueHeight * this.scale, l = this.trueWidth * this.scale, c, a, p, f;
          switch (this.rotate) {
            case 1:
            case -1:
            case 3:
            case -3:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (n - l) / 2, a = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (l - n) / 2, p = c - n + this.cropW, f = a - l + this.cropH;
              break;
            default:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2, a = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2, p = c - l + this.cropW, f = a - n + this.cropH;
              break;
          }
          o.x1 >= h.x1 && (s = c), o.y1 >= h.y1 && (r = a), o.x2 <= h.x2 && (s = p), o.y2 <= h.y2 && (r = f);
        }
        this.x = s, this.y = r, this.$emit("img-moving", {
          moving: !0,
          axis: this.getImgAxis()
        });
      });
    },
    // 移动图片结束
    leaveImg(t) {
      window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("img-moving", {
        moving: !1,
        axis: this.getImgAxis()
      });
    },
    // 缩放图片
    scaleImg() {
      this.canScale && window.addEventListener(this.support, this.changeSize, this.passive);
    },
    // 移出框
    cancelScale() {
      this.canScale && window.removeEventListener(this.support, this.changeSize);
    },
    // 改变大小函数
    changeSize(t) {
      t.preventDefault();
      let e = this.scale;
      var i = t.deltaY || t.wheelDelta, s = navigator.userAgent.indexOf("Firefox");
      i = s > 0 ? i * 30 : i, this.isIE && (i = -i);
      var r = this.coe;
      r = r / this.trueWidth > r / this.trueHeight ? r / this.trueHeight : r / this.trueWidth;
      var o = r * i;
      o < 0 ? e += Math.abs(o) : e > Math.abs(o) && (e -= Math.abs(o));
      let h = o < 0 ? "add" : "reduce";
      if (h !== this.coeStatus && (this.coeStatus = h, this.coe = 0.2), this.scaling || (this.scalingSet = setTimeout(() => {
        this.scaling = !1, this.coe = this.coe += 0.01;
      }, 50)), this.scaling = !0, !this.checkoutImgAxis(this.x, this.y, e))
        return !1;
      this.scale = e;
    },
    // 修改图片大小函数
    changeScale(t) {
      let e = this.scale;
      t = t || 1;
      var i = 20;
      if (i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth, t = t * i, t > 0 ? e += Math.abs(t) : e > Math.abs(t) && (e -= Math.abs(t)), !this.checkoutImgAxis(this.x, this.y, e))
        return !1;
      this.scale = e;
    },
    // 创建截图框
    createCrop(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      this.$nextTick(() => {
        var s = e - this.cropX, r = i - this.cropY;
        if (s > 0 ? (this.cropW = s + this.cropChangeX > this.w ? this.w - this.cropChangeX : s, this.cropOffsertX = this.cropChangeX) : (this.cropW = this.w - this.cropChangeX + Math.abs(s) > this.w ? this.cropChangeX : Math.abs(s), this.cropOffsertX = this.cropChangeX + s > 0 ? this.cropChangeX + s : 0), !this.fixed)
          r > 0 ? (this.cropH = r + this.cropChangeY > this.h ? this.h - this.cropChangeY : r, this.cropOffsertY = this.cropChangeY) : (this.cropH = this.h - this.cropChangeY + Math.abs(r) > this.h ? this.cropChangeY : Math.abs(r), this.cropOffsertY = this.cropChangeY + r > 0 ? this.cropChangeY + r : 0);
        else {
          var o = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          o + this.cropOffsertY > this.h ? (this.cropH = this.h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], s > 0 ? this.cropOffsertX = this.cropChangeX : this.cropOffsertX = this.cropChangeX - this.cropW) : this.cropH = o, this.cropOffsertY = this.cropOffsertY;
        }
      });
    },
    // 改变截图框大小
    changeCropSize(t, e, i, s, r) {
      t.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = e, this.canChangeY = i, this.changeCropTypeX = s, this.changeCropTypeY = r, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0), this.$emit("change-crop-size", {
        width: this.cropW,
        height: this.cropH
      });
    },
    // 正在改变
    changeCropNow(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      let s = this.w, r = this.h, o = 0, h = 0;
      if (this.centerBox) {
        let c = this.getImgAxis(), a = c.x2, p = c.y2;
        o = c.x1 > 0 ? c.x1 : 0, h = c.y1 > 0 ? c.y1 : 0, s > a && (s = a), r > p && (r = p);
      }
      const [n, l] = this.checkCropLimitSize();
      this.$nextTick(() => {
        var c = e - this.cropX, a = i - this.cropY;
        if (this.canChangeX && (this.changeCropTypeX === 1 ? this.cropOldW - c < n ? (this.cropW = n, this.cropOffsertX = this.cropOldW + this.cropChangeX - o - n) : this.cropOldW - c > 0 ? (this.cropW = s - this.cropChangeX - c <= s - o ? this.cropOldW - c : this.cropOldW + this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX - c <= s - o ? this.cropChangeX + c : o) : (this.cropW = Math.abs(c) + this.cropChangeX <= s ? Math.abs(c) - this.cropOldW : s - this.cropOldW - this.cropChangeX, this.cropOffsertX = this.cropChangeX + this.cropOldW) : this.changeCropTypeX === 2 && (this.cropOldW + c < n ? this.cropW = n : this.cropOldW + c > 0 ? (this.cropW = this.cropOldW + c + this.cropOffsertX <= s ? this.cropOldW + c : s - this.cropOffsertX, this.cropOffsertX = this.cropChangeX) : (this.cropW = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? Math.abs(c + this.cropOldW) : this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? this.cropChangeX - Math.abs(c + this.cropOldW) : o))), this.canChangeY && (this.changeCropTypeY === 1 ? this.cropOldH - a < l ? (this.cropH = l, this.cropOffsertY = this.cropOldH + this.cropChangeY - h - l) : this.cropOldH - a > 0 ? (this.cropH = r - this.cropChangeY - a <= r - h ? this.cropOldH - a : this.cropOldH + this.cropChangeY - h, this.cropOffsertY = r - this.cropChangeY - a <= r - h ? this.cropChangeY + a : h) : (this.cropH = Math.abs(a) + this.cropChangeY <= r ? Math.abs(a) - this.cropOldH : r - this.cropOldH - this.cropChangeY, this.cropOffsertY = this.cropChangeY + this.cropOldH) : this.changeCropTypeY === 2 && (this.cropOldH + a < l ? this.cropH = l : this.cropOldH + a > 0 ? (this.cropH = this.cropOldH + a + this.cropOffsertY <= r ? this.cropOldH + a : r - this.cropOffsertY, this.cropOffsertY = this.cropChangeY) : (this.cropH = r - this.cropChangeY + Math.abs(a + this.cropOldH) <= r - h ? Math.abs(a + this.cropOldH) : this.cropChangeY - h, this.cropOffsertY = r - this.cropChangeY + Math.abs(a + this.cropOldH) <= r - h ? this.cropChangeY - Math.abs(a + this.cropOldH) : h))), this.canChangeX && this.fixed) {
          var p = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          p < l ? (this.cropH = l, this.cropW = this.fixedNumber[0] * l / this.fixedNumber[1], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : p + this.cropOffsertY > r ? (this.cropH = r - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : this.cropH = p;
        }
        if (this.canChangeY && this.fixed) {
          var f = this.cropH / this.fixedNumber[1] * this.fixedNumber[0];
          f < n ? (this.cropW = n, this.cropH = this.fixedNumber[1] * n / this.fixedNumber[0], this.cropOffsertY = this.cropOldH + this.cropChangeY - this.cropH) : f + this.cropOffsertX > s ? (this.cropW = s - this.cropOffsertX, this.cropH = this.cropW / this.fixedNumber[0] * this.fixedNumber[1]) : this.cropW = f;
        }
      });
    },
    checkCropLimitSize() {
      let { cropW: t, cropH: e, limitMinSize: i } = this, s = new Array();
      return Array.isArray(i) ? s = i : s = [i, i], t = parseFloat(s[0]), e = parseFloat(s[1]), [t, e];
    },
    // 结束改变
    changeCropEnd(t) {
      window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd);
    },
    // 根据比例x/y，最小宽度，最小高度，现有宽度，现有高度，得到应该有的宽度和高度
    calculateSize(t, e, i, s, r, o) {
      const h = t / e;
      let n = r, l = o;
      return n < i && (n = i, l = Math.ceil(n / h)), l < s && (l = s, n = Math.ceil(l * h), n < i && (n = i, l = Math.ceil(n / h))), n < r && (n = r, l = Math.ceil(n / h)), l < o && (l = o, n = Math.ceil(l * h)), { width: n, height: l };
    },
    // 创建完成
    endCrop() {
      this.cropW === 0 && this.cropH === 0 && (this.cropping = !1);
      let [t, e] = this.checkCropLimitSize();
      const { width: i, height: s } = this.fixed ? this.calculateSize(
        this.fixedNumber[0],
        this.fixedNumber[1],
        t,
        e,
        this.cropW,
        this.cropH
      ) : { width: t, height: e };
      i > this.cropW && (this.cropW = i, this.cropOffsertX + i > this.w && (this.cropOffsertX = this.w - i)), s > this.cropH && (this.cropH = s, this.cropOffsertY + s > this.h && (this.cropOffsertY = this.h - s)), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop);
    },
    // 开始截图
    startCrop() {
      this.crop = !0;
    },
    // 停止截图
    stopCrop() {
      this.crop = !1;
    },
    // 清除截图
    clearCrop() {
      this.cropping = !1, this.cropW = 0, this.cropH = 0;
    },
    // 截图移动
    cropMove(t) {
      if (t.preventDefault(), !this.canMoveBox)
        return this.crop = !1, this.startMove(t), !1;
      if (t.touches && t.touches.length === 2)
        return this.crop = !1, this.startMove(t), this.leaveCrop(), !1;
      window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.cropOffsertX, r = i - this.cropOffsertY, this.cropX = s, this.cropY = r, this.$emit("crop-moving", {
        moving: !0,
        axis: this.getCropAxis()
      });
    },
    moveCrop(t, e) {
      let i = 0, s = 0;
      t && (t.preventDefault(), i = "clientX" in t ? t.clientX : t.touches[0].clientX, s = "clientY" in t ? t.clientY : t.touches[0].clientY), this.$nextTick(() => {
        let r, o, h = i - this.cropX, n = s - this.cropY;
        if (e && (h = this.cropOffsertX, n = this.cropOffsertY), h <= 0 ? r = 0 : h + this.cropW > this.w ? r = this.w - this.cropW : r = h, n <= 0 ? o = 0 : n + this.cropH > this.h ? o = this.h - this.cropH : o = n, this.centerBox) {
          let l = this.getImgAxis();
          r <= l.x1 && (r = l.x1), r + this.cropW > l.x2 && (r = l.x2 - this.cropW), o <= l.y1 && (o = l.y1), o + this.cropH > l.y2 && (o = l.y2 - this.cropH);
        }
        this.cropOffsertX = r, this.cropOffsertY = o, this.$emit("crop-moving", {
          moving: !0,
          axis: this.getCropAxis()
        });
      });
    },
    // 算出不同场景下面 图片相对于外层容器的坐标轴
    getImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }, r = this.trueWidth * i, o = this.trueHeight * i;
      switch (this.rotate) {
        case 0:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
        case 1:
        case -1:
        case 3:
        case -3:
          s.x1 = t + this.trueWidth * (1 - i) / 2 + (r - o) / 2, s.x2 = s.x1 + this.trueHeight * i, s.y1 = e + this.trueHeight * (1 - i) / 2 + (o - r) / 2, s.y2 = s.y1 + this.trueWidth * i;
          break;
        default:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
      }
      return s;
    },
    // 获取截图框的坐标轴
    getCropAxis() {
      let t = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      return t.x1 = this.cropOffsertX, t.x2 = t.x1 + this.cropW, t.y1 = this.cropOffsertY, t.y2 = t.y1 + this.cropH, t;
    },
    leaveCrop(t) {
      window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("crop-moving", {
        moving: !1,
        axis: this.getCropAxis()
      });
    },
    getCropChecked(t) {
      let e = document.createElement("canvas"), i = new Image(), s = this.rotate, r = this.trueWidth, o = this.trueHeight, h = this.cropOffsertX, n = this.cropOffsertY;
      i.onload = () => {
        if (this.cropW !== 0) {
          let a = e.getContext("2d"), p = 1;
          this.high & !this.full && (p = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (p = Math.abs(Number(this.enlarge)));
          let f = this.cropW * p, w = this.cropH * p, u = r * this.scale * p, d = o * this.scale * p, g = (this.x - h + this.trueWidth * (1 - this.scale) / 2) * p, m = (this.y - n + this.trueHeight * (1 - this.scale) / 2) * p;
          switch (c(f, w), a.save(), this.fillColor && (a.fillStyle = this.fillColor, a.fillRect(0, 0, e.width, e.height)), s) {
            case 0:
              this.full ? (c(f / this.scale, w / this.scale), a.drawImage(
                i,
                g / this.scale,
                m / this.scale,
                u / this.scale,
                d / this.scale
              )) : a.drawImage(i, g, m, u, d);
              break;
            case 1:
            case -3:
              this.full ? (c(f / this.scale, w / this.scale), g = g / this.scale + (u / this.scale - d / this.scale) / 2, m = m / this.scale + (d / this.scale - u / this.scale) / 2, a.rotate(s * 90 * Math.PI / 180), a.drawImage(
                i,
                m,
                -g - d / this.scale,
                u / this.scale,
                d / this.scale
              )) : (g = g + (u - d) / 2, m = m + (d - u) / 2, a.rotate(s * 90 * Math.PI / 180), a.drawImage(i, m, -g - d, u, d));
              break;
            case 2:
            case -2:
              this.full ? (c(f / this.scale, w / this.scale), a.rotate(s * 90 * Math.PI / 180), g = g / this.scale, m = m / this.scale, a.drawImage(
                i,
                -g - u / this.scale,
                -m - d / this.scale,
                u / this.scale,
                d / this.scale
              )) : (a.rotate(s * 90 * Math.PI / 180), a.drawImage(i, -g - u, -m - d, u, d));
              break;
            case 3:
            case -1:
              this.full ? (c(f / this.scale, w / this.scale), g = g / this.scale + (u / this.scale - d / this.scale) / 2, m = m / this.scale + (d / this.scale - u / this.scale) / 2, a.rotate(s * 90 * Math.PI / 180), a.drawImage(
                i,
                -m - u / this.scale,
                g,
                u / this.scale,
                d / this.scale
              )) : (g = g + (u - d) / 2, m = m + (d - u) / 2, a.rotate(s * 90 * Math.PI / 180), a.drawImage(i, -m - u, g, u, d));
              break;
            default:
              this.full ? (c(f / this.scale, w / this.scale), a.drawImage(
                i,
                g / this.scale,
                m / this.scale,
                u / this.scale,
                d / this.scale
              )) : a.drawImage(i, g, m, u, d);
          }
          a.restore();
        } else {
          let a = r * this.scale, p = o * this.scale, f = e.getContext("2d");
          switch (f.save(), this.fillColor && (f.fillStyle = this.fillColor, f.fillRect(0, 0, e.width, e.height)), s) {
            case 0:
              c(a, p), f.drawImage(i, 0, 0, a, p);
              break;
            case 1:
            case -3:
              c(p, a), f.rotate(s * 90 * Math.PI / 180), f.drawImage(i, 0, -p, a, p);
              break;
            case 2:
            case -2:
              c(a, p), f.rotate(s * 90 * Math.PI / 180), f.drawImage(i, -a, -p, a, p);
              break;
            case 3:
            case -1:
              c(p, a), f.rotate(s * 90 * Math.PI / 180), f.drawImage(i, -a, 0, a, p);
              break;
            default:
              c(a, p), f.drawImage(i, 0, 0, a, p);
          }
          f.restore();
        }
        t(e);
      };
      var l = this.img.substr(0, 4);
      l !== "data" && (i.crossOrigin = "Anonymous"), i.src = this.imgs;
      function c(a, p) {
        e.width = Math.round(a), e.height = Math.round(p);
      }
    },
    // 获取转换成base64 的图片信息
    getCropData(t) {
      this.getCropChecked((e) => {
        t(e.toDataURL("image/" + this.outputType, this.outputSize));
      });
    },
    //canvas获取为blob对象
    getCropBlob(t) {
      this.getCropChecked((e) => {
        e.toBlob(
          (i) => t(i),
          "image/" + this.outputType,
          this.outputSize
        );
      });
    },
    // 自动预览函数
    showPreview() {
      if (this.isCanShow)
        this.isCanShow = !1, setTimeout(() => {
          this.isCanShow = !0;
        }, 16);
      else
        return !1;
      let t = this.cropW, e = this.cropH, i = this.scale;
      var s = {};
      s.div = {
        width: `${t}px`,
        height: `${e}px`
      };
      let r = (this.x - this.cropOffsertX) / i, o = (this.y - this.cropOffsertY) / i, h = 0;
      s.w = t, s.h = e, s.url = this.imgs, s.img = {
        width: `${this.trueWidth}px`,
        height: `${this.trueHeight}px`,
        transform: `scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate * 90}deg)`
      }, s.html = `
      <div class="show-preview" style="width: ${s.w}px; height: ${s.h}px,; overflow: hidden">
        <div style="width: ${t}px; height: ${e}px">
          <img src=${s.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate * 90}deg)">
        </div>
      </div>`, this.$emit("real-time", s);
    },
    // reload 图片布局函数
    reload() {
      let t = new Image();
      t.onload = () => {
        this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width), this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height), this.trueWidth = t.width, this.trueHeight = t.height, this.original ? this.scale = 1 : this.scale = this.checkedMode(), this.$nextTick(() => {
          this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2, this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2, this.loading = !1, this.autoCrop && this.goAutoCrop(), this.$emit("img-load", "success"), setTimeout(() => {
            this.showPreview();
          }, 20);
        });
      }, t.onerror = () => {
        this.$emit("img-load", "error");
      }, t.src = this.imgs;
    },
    // 背景布局的函数
    checkedMode() {
      let t = 1, e = this.trueWidth, i = this.trueHeight;
      const s = this.mode.split(" ");
      switch (s[0]) {
        case "contain":
          this.trueWidth > this.w && (t = this.w / this.trueWidth), this.trueHeight * t > this.h && (t = this.h / this.trueHeight);
          break;
        case "cover":
          e = this.w, t = e / this.trueWidth, i = i * t, i < this.h && (i = this.h, t = i / this.trueHeight);
          break;
        default:
          try {
            let r = s[0];
            if (r.search("px") !== -1) {
              r = r.replace("px", ""), e = parseFloat(r);
              const o = e / this.trueWidth;
              let h = 1, n = s[1];
              n.search("px") !== -1 && (n = n.replace("px", ""), i = parseFloat(n), h = i / this.trueHeight), t = Math.min(o, h);
            }
            if (r.search("%") !== -1 && (r = r.replace("%", ""), e = parseFloat(r) / 100 * this.w, t = e / this.trueWidth), s.length === 2 && r === "auto") {
              let o = s[1];
              o.search("px") !== -1 && (o = o.replace("px", ""), i = parseFloat(o), t = i / this.trueHeight), o.search("%") !== -1 && (o = o.replace("%", ""), i = parseFloat(o) / 100 * this.h, t = i / this.trueHeight);
            }
          } catch {
            t = 1;
          }
      }
      return t;
    },
    // 自动截图函数
    goAutoCrop(t, e) {
      if (this.imgs === "" || this.imgs === null)
        return;
      this.clearCrop(), this.cropping = !0;
      let i = this.w, s = this.h;
      if (this.centerBox) {
        const h = Math.abs(this.rotate) % 2 > 0;
        let n = (h ? this.trueHeight : this.trueWidth) * this.scale, l = (h ? this.trueWidth : this.trueHeight) * this.scale;
        i = n < i ? n : i, s = l < s ? l : s;
      }
      var r = t || parseFloat(this.autoCropWidth), o = e || parseFloat(this.autoCropHeight);
      (r === 0 || o === 0) && (r = i * 0.8, o = s * 0.8), r = r > i ? i : r, o = o > s ? s : o, this.fixed && (o = r / this.fixedNumber[0] * this.fixedNumber[1]), o > this.h && (o = this.h, r = o / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(r, o);
    },
    // 手动改变截图框大小函数
    changeCrop(t, e) {
      if (this.centerBox) {
        let i = this.getImgAxis();
        t > i.x2 - i.x1 && (t = i.x2 - i.x1, e = t / this.fixedNumber[0] * this.fixedNumber[1]), e > i.y2 - i.y1 && (e = i.y2 - i.y1, t = e / this.fixedNumber[1] * this.fixedNumber[0]);
      }
      this.cropW = t, this.cropH = e, this.checkCropLimitSize(), this.$nextTick(() => {
        this.cropOffsertX = (this.w - this.cropW) / 2, this.cropOffsertY = (this.h - this.cropH) / 2, this.centerBox && this.moveCrop(null, !0);
      });
    },
    // 重置函数， 恢复组件置初始状态
    refresh() {
      this.img, this.imgs = "", this.scale = 1, this.crop = !1, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.clearCrop(), this.$nextTick(() => {
        this.checkedImg();
      });
    },
    // 向左边旋转
    rotateLeft() {
      this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
    },
    // 向右边旋转
    rotateRight() {
      this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
    },
    // 清除旋转
    rotateClear() {
      this.rotate = 0;
    },
    // 图片坐标点校验
    checkoutImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = !0;
      if (this.centerBox) {
        let r = this.getImgAxis(t, e, i), o = this.getCropAxis();
        r.x1 >= o.x1 && (s = !1), r.x2 <= o.x2 && (s = !1), r.y1 >= o.y1 && (s = !1), r.y2 <= o.y2 && (s = !1);
      }
      return s;
    }
  },
  mounted() {
    this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
    let t = this;
    var e = navigator.userAgent;
    this.isIOS = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(i, s, r) {
        for (var o = atob(this.toDataURL(s, r).split(",")[1]), h = o.length, n = new Uint8Array(h), l = 0; l < h; l++)
          n[l] = o.charCodeAt(l);
        i(new Blob([n], { type: t.type || "image/png" }));
      }
    }), this.showPreview(), this.checkedImg();
  },
  unmounted() {
    window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.cancelScale();
  }
}), $ = {
  key: 0,
  class: "cropper-box"
}, z = ["src"], B = { class: "cropper-view-box" }, P = ["src"], D = { key: 1 };
function U(t, e, i, s, r, o) {
  return C(), x("div", {
    class: "vue-cropper",
    ref: "cropper",
    onMouseover: e[28] || (e[28] = (...h) => t.scaleImg && t.scaleImg(...h)),
    onMouseout: e[29] || (e[29] = (...h) => t.cancelScale && t.cancelScale(...h))
  }, [
    t.imgs ? (C(), x("div", $, [
      O(v("div", {
        class: "cropper-box-canvas",
        style: y({
          width: t.trueWidth + "px",
          height: t.trueHeight + "px",
          transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + t.x / t.scale + "px," + t.y / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
        })
      }, [
        v("img", {
          src: t.imgs,
          alt: "cropper-img",
          ref: "cropperImg"
        }, null, 8, z)
      ], 4), [
        [X, !t.loading]
      ])
    ])) : b("", !0),
    v("div", {
      class: S(["cropper-drag-box", { "cropper-move": t.move && !t.crop, "cropper-crop": t.crop, "cropper-modal": t.cropping }]),
      onMousedown: e[0] || (e[0] = (...h) => t.startMove && t.startMove(...h)),
      onTouchstart: e[1] || (e[1] = (...h) => t.startMove && t.startMove(...h))
    }, null, 34),
    O(v("div", {
      class: "cropper-crop-box",
      style: y({
        width: t.cropW + "px",
        height: t.cropH + "px",
        transform: "translate3d(" + t.cropOffsertX + "px," + t.cropOffsertY + "px,0)"
      })
    }, [
      v("span", B, [
        v("img", {
          style: y({
            width: t.trueWidth + "px",
            height: t.trueHeight + "px",
            transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + (t.x - t.cropOffsertX) / t.scale + "px," + (t.y - t.cropOffsertY) / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
          }),
          src: t.imgs,
          alt: "cropper-img"
        }, null, 12, P)
      ]),
      v("span", {
        class: "cropper-face cropper-move",
        onMousedown: e[2] || (e[2] = (...h) => t.cropMove && t.cropMove(...h)),
        onTouchstart: e[3] || (e[3] = (...h) => t.cropMove && t.cropMove(...h))
      }, null, 32),
      t.info ? (C(), x("span", {
        key: 0,
        class: "crop-info",
        style: y({ top: t.cropInfo.top })
      }, H(t.cropInfo.width) + " × " + H(t.cropInfo.height), 5)) : b("", !0),
      t.fixedBox ? b("", !0) : (C(), x("span", D, [
        v("span", {
          class: "crop-line line-w",
          onMousedown: e[4] || (e[4] = (h) => t.changeCropSize(h, !1, !0, 0, 1)),
          onTouchstart: e[5] || (e[5] = (h) => t.changeCropSize(h, !1, !0, 0, 1))
        }, null, 32),
        v("span", {
          class: "crop-line line-a",
          onMousedown: e[6] || (e[6] = (h) => t.changeCropSize(h, !0, !1, 1, 0)),
          onTouchstart: e[7] || (e[7] = (h) => t.changeCropSize(h, !0, !1, 1, 0))
        }, null, 32),
        v("span", {
          class: "crop-line line-s",
          onMousedown: e[8] || (e[8] = (h) => t.changeCropSize(h, !1, !0, 0, 2)),
          onTouchstart: e[9] || (e[9] = (h) => t.changeCropSize(h, !1, !0, 0, 2))
        }, null, 32),
        v("span", {
          class: "crop-line line-d",
          onMousedown: e[10] || (e[10] = (h) => t.changeCropSize(h, !0, !1, 2, 0)),
          onTouchstart: e[11] || (e[11] = (h) => t.changeCropSize(h, !0, !1, 2, 0))
        }, null, 32),
        v("span", {
          class: "crop-point point1",
          onMousedown: e[12] || (e[12] = (h) => t.changeCropSize(h, !0, !0, 1, 1)),
          onTouchstart: e[13] || (e[13] = (h) => t.changeCropSize(h, !0, !0, 1, 1))
        }, null, 32),
        v("span", {
          class: "crop-point point2",
          onMousedown: e[14] || (e[14] = (h) => t.changeCropSize(h, !1, !0, 0, 1)),
          onTouchstart: e[15] || (e[15] = (h) => t.changeCropSize(h, !1, !0, 0, 1))
        }, null, 32),
        v("span", {
          class: "crop-point point3",
          onMousedown: e[16] || (e[16] = (h) => t.changeCropSize(h, !0, !0, 2, 1)),
          onTouchstart: e[17] || (e[17] = (h) => t.changeCropSize(h, !0, !0, 2, 1))
        }, null, 32),
        v("span", {
          class: "crop-point point4",
          onMousedown: e[18] || (e[18] = (h) => t.changeCropSize(h, !0, !1, 1, 0)),
          onTouchstart: e[19] || (e[19] = (h) => t.changeCropSize(h, !0, !1, 1, 0))
        }, null, 32),
        v("span", {
          class: "crop-point point5",
          onMousedown: e[20] || (e[20] = (h) => t.changeCropSize(h, !0, !1, 2, 0)),
          onTouchstart: e[21] || (e[21] = (h) => t.changeCropSize(h, !0, !1, 2, 0))
        }, null, 32),
        v("span", {
          class: "crop-point point6",
          onMousedown: e[22] || (e[22] = (h) => t.changeCropSize(h, !0, !0, 1, 2)),
          onTouchstart: e[23] || (e[23] = (h) => t.changeCropSize(h, !0, !0, 1, 2))
        }, null, 32),
        v("span", {
          class: "crop-point point7",
          onMousedown: e[24] || (e[24] = (h) => t.changeCropSize(h, !1, !0, 0, 2)),
          onTouchstart: e[25] || (e[25] = (h) => t.changeCropSize(h, !1, !0, 0, 2))
        }, null, 32),
        v("span", {
          class: "crop-point point8",
          onMousedown: e[26] || (e[26] = (h) => t.changeCropSize(h, !0, !0, 2, 2)),
          onTouchstart: e[27] || (e[27] = (h) => t.changeCropSize(h, !0, !0, 2, 2))
        }, null, 32)
      ]))
    ], 4), [
      [X, t.cropping]
    ])
  ], 544);
}
const W = /* @__PURE__ */ N(A, [["render", U], ["__scopeId", "data-v-69939069"]]), F = function(t) {
  t.component("VueCropper", W);
}, j = {
  version: "1.1.0",
  install: F,
  VueCropper: W
};
export {
  W as VueCropper,
  j as default,
  j as globalCropper
};
