(function(v,p){typeof exports=="object"&&typeof module<"u"?p(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],p):(v=typeof globalThis<"u"?globalThis:v||self,p(v["vue-cropper"]={},v.Vue))})(this,function(v,p){"use strict";var x=document.createElement("style");x.textContent=`.vue-cropper[data-v-9be9b9b9]{position:relative;width:100%;height:100%;box-sizing:border-box;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;direction:ltr;touch-action:none;text-align:left;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-box[data-v-9be9b9b9],.cropper-box-canvas[data-v-9be9b9b9],.cropper-drag-box[data-v-9be9b9b9],.cropper-crop-box[data-v-9be9b9b9],.cropper-face[data-v-9be9b9b9]{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-user-select:none;user-select:none}.cropper-box-canvas img[data-v-9be9b9b9]{position:relative;text-align:left;-webkit-user-select:none;user-select:none;transform:none;max-width:none;max-height:none}.cropper-box[data-v-9be9b9b9]{overflow:hidden}.cropper-move[data-v-9be9b9b9]{cursor:move}.cropper-crop[data-v-9be9b9b9]{cursor:crosshair}.cropper-modal[data-v-9be9b9b9]{background:rgba(0,0,0,.5)}.cropper-view-box[data-v-9be9b9b9]{display:block;overflow:hidden;width:100%;height:100%;outline:1px solid #39f;outline-color:#3399ffbf;-webkit-user-select:none;user-select:none}.cropper-view-box img[data-v-9be9b9b9]{-webkit-user-select:none;user-select:none;text-align:left;max-width:none;max-height:none}.cropper-face[data-v-9be9b9b9]{top:0;left:0;background-color:#fff;opacity:.1}.crop-info[data-v-9be9b9b9]{position:absolute;left:0;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:#000c;font-size:12px}.crop-line[data-v-9be9b9b9]{position:absolute;display:block;width:100%;height:100%;opacity:.1}.line-w[data-v-9be9b9b9]{top:-3px;left:0;height:5px;cursor:n-resize}.line-a[data-v-9be9b9b9]{top:0;left:-3px;width:5px;cursor:w-resize}.line-s[data-v-9be9b9b9]{bottom:-3px;left:0;height:5px;cursor:s-resize}.line-d[data-v-9be9b9b9]{top:0;right:-3px;width:5px;cursor:e-resize}.crop-point[data-v-9be9b9b9]{position:absolute;width:8px;height:8px;opacity:.75;background-color:#39f;border-radius:100%}.point1[data-v-9be9b9b9]{top:-4px;left:-4px;cursor:nw-resize}.point2[data-v-9be9b9b9]{top:-5px;left:50%;margin-left:-3px;cursor:n-resize}.point3[data-v-9be9b9b9]{top:-4px;right:-4px;cursor:ne-resize}.point4[data-v-9be9b9b9]{top:50%;left:-4px;margin-top:-3px;cursor:w-resize}.point5[data-v-9be9b9b9]{top:50%;right:-4px;margin-top:-3px;cursor:e-resize}.point6[data-v-9be9b9b9]{bottom:-5px;left:-4px;cursor:sw-resize}.point7[data-v-9be9b9b9]{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize}.point8[data-v-9be9b9b9]{bottom:-5px;right:-4px;cursor:se-resize}@media screen and (max-width: 500px){.crop-point[data-v-9be9b9b9]{position:absolute;width:20px;height:20px;opacity:.45;background-color:#39f;border-radius:100%}.point1[data-v-9be9b9b9]{top:-10px;left:-10px}.point2[data-v-9be9b9b9],.point4[data-v-9be9b9b9],.point5[data-v-9be9b9b9],.point7[data-v-9be9b9b9]{display:none}.point3[data-v-9be9b9b9]{top:-10px;right:-10px}.point4[data-v-9be9b9b9]{top:0;left:0}.point6[data-v-9be9b9b9]{bottom:-10px;left:-10px}.point8[data-v-9be9b9b9]{bottom:-10px;right:-10px}}
`,document.head.appendChild(x);const y={};y.getData=t=>new Promise((e,i)=>{let s={};W(t).then(r=>{s.arrayBuffer=r;try{s.orientation=M(r)}catch{s.orientation=-1}e(s)}).catch(r=>{i(r)})});function W(t){let e=null;return new Promise((i,s)=>{if(t.src)if(/^data\:/i.test(t.src))e=X(t.src),i(e);else if(/^blob\:/i.test(t.src)){var r=new FileReader;r.onload=function(h){e=h.target.result,i(e)},O(t.src,function(h){r.readAsArrayBuffer(h)})}else{var o=new XMLHttpRequest;o.onload=function(){if(this.status==200||this.status===0)e=o.response,i(e);else throw"Could not load image";o=null},o.open("GET",t.src,!0),o.responseType="arraybuffer",o.send(null)}else s("img error")})}function O(t,e){var i=new XMLHttpRequest;i.open("GET",t,!0),i.responseType="blob",i.onload=function(s){(this.status==200||this.status===0)&&e(this.response)},i.send()}function X(t,e){e=e||t.match(/^data\:([^\;]+)\;base64,/mi)[1]||"",t=t.replace(/^data\:([^\;]+)\;base64,/gmi,"");for(var i=atob(t),s=i.length%2==0?i.length:i.length+1,r=new ArrayBuffer(s),o=new Uint16Array(r),h=0;h<s;h++)o[h]=i.charCodeAt(h);return r}function Y(t,e,i){var s="",r;for(r=e,i+=e;r<i;r++)s+=String.fromCharCode(t.getUint8(r));return s}function M(t){var e=new DataView(t),i=e.byteLength,s,r,o,h,n,l,c,a,f,u;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(f=2;f<i;){if(e.getUint8(f)===255&&e.getUint8(f+1)===225){c=f;break}f++}if(c&&(r=c+4,o=c+10,Y(e,r,4)==="Exif"&&(l=e.getUint16(o),n=l===18761,(n||l===19789)&&e.getUint16(o+2,n)===42&&(h=e.getUint32(o+4,n),h>=8&&(a=o+h)))),a){for(i=e.getUint16(a,n),u=0;u<i;u++)if(f=a+u*12+2,e.getUint16(f,n)===274){f+=8,s=e.getUint16(f,n);break}}return s}const T="",S=(t,e)=>{const i=t.__vccOpts||t;for(const[s,r]of e)i[s]=r;return i},E=p.defineComponent({data:function(){return{w:0,h:0,scale:1,x:0,y:0,loading:!0,trueWidth:0,trueHeight:0,move:!0,moveX:0,moveY:0,crop:!1,cropping:!1,cropW:0,cropH:0,cropOldW:0,cropOldH:0,canChangeX:!1,canChangeY:!1,changeCropTypeX:1,changeCropTypeY:1,cropX:0,cropY:0,cropChangeX:0,cropChangeY:0,cropOffsertX:0,cropOffsertY:0,support:"",touches:[],touchNow:!1,rotate:0,isIos:!1,orientation:0,imgs:"",coe:.2,scaling:!1,scalingSet:"",coeStatus:"",isCanShow:!0,imgIsQqualCrop:!1}},props:{img:{type:[String,Blob,null,File],default:""},outputSize:{type:Number,default:1},outputType:{type:String,default:"jpeg"},info:{type:Boolean,default:!0},canScale:{type:Boolean,default:!0},autoCrop:{type:Boolean,default:!1},autoCropWidth:{type:[Number,String],default:0},autoCropHeight:{type:[Number,String],default:0},fixed:{type:Boolean,default:!1},fixedNumber:{type:Array,default:()=>[1,1]},fixedBox:{type:Boolean,default:!1},full:{type:Boolean,default:!1},canMove:{type:Boolean,default:!0},canMoveBox:{type:Boolean,default:!0},original:{type:Boolean,default:!1},centerBox:{type:Boolean,default:!1},high:{type:Boolean,default:!0},infoTrue:{type:Boolean,default:!1},maxImgSize:{type:[Number,String],default:2e3},enlarge:{type:[Number,String],default:1},preW:{type:[Number,String],default:0},mode:{type:String,default:"contain"},limitMinSize:{type:[Number,Array,String],default:()=>10,validator:function(t){return Array.isArray(t)?Number(t[0])>=0&&Number(t[1])>=0:Number(t)>=0}},fillColor:{type:String,default:""}},computed:{cropInfo(){let t={};if(t.top=this.cropOffsertY>21?"-21px":"0px",t.width=this.cropW>0?this.cropW:0,t.height=this.cropH>0?this.cropH:0,this.infoTrue){let e=1;this.high&&!this.full&&(e=window.devicePixelRatio),this.enlarge!==1&!this.full&&(e=Math.abs(Number(this.enlarge))),t.width=t.width*e,t.height=t.height*e,this.full&&(t.width=t.width/this.scale,t.height=t.height/this.scale)}return t.width=t.width.toFixed(0),t.height=t.height.toFixed(0),t},isIE(){return!!window.ActiveXObject||"ActiveXObject"in window},passive(){return this.isIE?null:{passive:!1}}},watch:{img(){this.checkedImg()},imgs(t){t!==""&&this.reload()},cropW(){this.showPreview()},cropH(){this.showPreview()},cropOffsertX(){this.showPreview()},cropOffsertY(){this.showPreview()},scale(t,e){this.showPreview()},x(){this.showPreview()},y(){this.showPreview()},autoCrop(t){t&&this.goAutoCrop()},autoCropWidth(){this.autoCrop&&this.goAutoCrop()},autoCropHeight(){this.autoCrop&&this.goAutoCrop()},mode(){this.checkedImg()},rotate(){this.showPreview(),this.autoCrop?this.goAutoCrop(this.cropW,this.cropH):(this.cropW>0||this.cropH>0)&&this.goAutoCrop(this.cropW,this.cropH)}},methods:{getVersion(t){var e=navigator.userAgent.split(" "),i="";let s=0;const r=new RegExp(t,"i");for(var o=0;o<e.length;o++)r.test(e[o])&&(i=e[o]);return i?s=i.split("/")[1].split("."):s=["0","0","0"],s},checkOrientationImage(t,e,i,s){if(this.getVersion("chrome")[0]>=81)e=-1;else if(this.getVersion("safari")[0]>=605){const h=this.getVersion("version");h[0]>13&&h[1]>1&&(e=-1)}else{const h=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);if(h){let n=h[1];n=n.split("_"),(n[0]>13||n[0]>=13&&n[1]>=4)&&(e=-1)}}let r=document.createElement("canvas"),o=r.getContext("2d");switch(o.save(),e){case 2:r.width=i,r.height=s,o.translate(i,0),o.scale(-1,1);break;case 3:r.width=i,r.height=s,o.translate(i/2,s/2),o.rotate(180*Math.PI/180),o.translate(-i/2,-s/2);break;case 4:r.width=i,r.height=s,o.translate(0,s),o.scale(1,-1);break;case 5:r.height=i,r.width=s,o.rotate(.5*Math.PI),o.scale(1,-1);break;case 6:r.width=s,r.height=i,o.translate(s/2,i/2),o.rotate(90*Math.PI/180),o.translate(-i/2,-s/2);break;case 7:r.height=i,r.width=s,o.rotate(.5*Math.PI),o.translate(i,-s),o.scale(-1,1);break;case 8:r.height=i,r.width=s,o.translate(s/2,i/2),o.rotate(-90*Math.PI/180),o.translate(-i/2,-s/2);break;default:r.width=i,r.height=s}o.drawImage(t,0,0,i,s),o.restore(),r.toBlob(h=>{let n=URL.createObjectURL(h);URL.revokeObjectURL(this.imgs),this.imgs=n},"image/"+this.outputType,1)},checkedImg(){if(this.img===null||this.img===""){this.imgs="",this.clearCrop();return}this.loading=!0,this.scale=1,this.rotate=0,this.imgIsQqualCrop=!1,this.clearCrop();let t=new Image;if(t.onload=()=>{if(this.img==="")return this.$emit("img-load",new Error("图片不能为空")),!1;let i=t.width,s=t.height;y.getData(t).then(r=>{this.orientation=r.orientation||1;let o=Number(this.maxImgSize);if(!this.orientation&&i<o&s<o){this.imgs=this.img;return}i>o&&(s=s/i*o,i=o),s>o&&(i=i/s*o,s=o),this.checkOrientationImage(t,this.orientation,i,s)}).catch(r=>{this.$emit("img-load","error"),this.$emit("img-load-error",r)})},t.onerror=i=>{this.$emit("img-load","error"),this.$emit("img-load-error",i)},this.img.substr(0,4)!=="data"&&(t.crossOrigin=""),this.isIE){var e=new XMLHttpRequest;e.onload=function(){var i=URL.createObjectURL(this.response);t.src=i},e.open("GET",this.img,!0),e.responseType="blob",e.send()}else t.src=this.img},startMove(t){if(t.preventDefault(),this.move&&!this.crop){if(!this.canMove)return!1;this.moveX=("clientX"in t?t.clientX:t.touches[0].clientX)-this.x,this.moveY=("clientY"in t?t.clientY:t.touches[0].clientY)-this.y,t.touches?(window.addEventListener("touchmove",this.moveImg),window.addEventListener("touchend",this.leaveImg),t.touches.length==2&&(this.touches=t.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancelTouchScale))):(window.addEventListener("mousemove",this.moveImg),window.addEventListener("mouseup",this.leaveImg)),this.$emit("img-moving",{moving:!0,axis:this.getImgAxis()})}else this.cropping=!0,window.addEventListener("mousemove",this.createCrop),window.addEventListener("mouseup",this.endCrop),window.addEventListener("touchmove",this.createCrop),window.addEventListener("touchend",this.endCrop),this.cropOffsertX=t.offsetX?t.offsetX:t.touches[0].pageX-this.$refs.cropper.offsetLeft,this.cropOffsertY=t.offsetY?t.offsetY:t.touches[0].pageY-this.$refs.cropper.offsetTop,this.cropX="clientX"in t?t.clientX:t.touches[0].clientX,this.cropY="clientY"in t?t.clientY:t.touches[0].clientY,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.cropW=0,this.cropH=0},touchScale(t){t.preventDefault();let e=this.scale;var i={x:this.touches[0].clientX,y:this.touches[0].clientY},s={x:t.touches[0].clientX,y:t.touches[0].clientY},r={x:this.touches[1].clientX,y:this.touches[1].clientY},o={x:t.touches[1].clientX,y:t.touches[1].clientY},h=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2)),n=Math.sqrt(Math.pow(s.x-o.x,2)+Math.pow(s.y-o.y,2)),l=n-h,c=1;c=c/this.trueWidth>c/this.trueHeight?c/this.trueHeight:c/this.trueWidth,c=c>.1?.1:c;var a=c*l;if(!this.touchNow){if(this.touchNow=!0,l>0?e+=Math.abs(a):l<0&&e>Math.abs(a)&&(e-=Math.abs(a)),this.touches=t.touches,setTimeout(()=>{this.touchNow=!1},8),!this.checkoutImgAxis(this.x,this.y,e))return!1;this.scale=e}},cancelTouchScale(t){window.removeEventListener("touchmove",this.touchScale)},moveImg(t){if(t.preventDefault(),t.touches&&t.touches.length===2)return this.touches=t.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancelTouchScale),window.removeEventListener("touchmove",this.moveImg),!1;let e="clientX"in t?t.clientX:t.touches[0].clientX,i="clientY"in t?t.clientY:t.touches[0].clientY,s,r;s=e-this.moveX,r=i-this.moveY,this.$nextTick(()=>{if(this.centerBox){let o=this.getImgAxis(s,r,this.scale),h=this.getCropAxis(),n=this.trueHeight*this.scale,l=this.trueWidth*this.scale,c,a,f,u;switch(this.rotate){case 1:case-1:case 3:case-3:c=this.cropOffsertX-this.trueWidth*(1-this.scale)/2+(n-l)/2,a=this.cropOffsertY-this.trueHeight*(1-this.scale)/2+(l-n)/2,f=c-n+this.cropW,u=a-l+this.cropH;break;default:c=this.cropOffsertX-this.trueWidth*(1-this.scale)/2,a=this.cropOffsertY-this.trueHeight*(1-this.scale)/2,f=c-l+this.cropW,u=a-n+this.cropH;break}o.x1>=h.x1&&(s=c),o.y1>=h.y1&&(r=a),o.x2<=h.x2&&(s=f),o.y2<=h.y2&&(r=u)}this.x=s,this.y=r,this.$emit("img-moving",{moving:!0,axis:this.getImgAxis()})})},leaveImg(t){window.removeEventListener("mousemove",this.moveImg),window.removeEventListener("touchmove",this.moveImg),window.removeEventListener("mouseup",this.leaveImg),window.removeEventListener("touchend",this.leaveImg),this.$emit("img-moving",{moving:!1,axis:this.getImgAxis()})},scaleImg(){this.canScale&&window.addEventListener(this.support,this.changeSize,this.passive)},cancelScale(){this.canScale&&window.removeEventListener(this.support,this.changeSize)},changeSize(t){t.preventDefault();let e=this.scale;var i=t.deltaY||t.wheelDelta,s=navigator.userAgent.indexOf("Firefox");i=s>0?i*30:i,this.isIE&&(i=-i);var r=this.coe;r=r/this.trueWidth>r/this.trueHeight?r/this.trueHeight:r/this.trueWidth;var o=r*i;o<0?e+=Math.abs(o):e>Math.abs(o)&&(e-=Math.abs(o));let h=o<0?"add":"reduce";if(h!==this.coeStatus&&(this.coeStatus=h,this.coe=.2),this.scaling||(this.scalingSet=setTimeout(()=>{this.scaling=!1,this.coe=this.coe+=.01},50)),this.scaling=!0,!this.checkoutImgAxis(this.x,this.y,e))return!1;this.scale=e},changeScale(t){let e=this.scale;t=t||1;var i=20;if(i=i/this.trueWidth>i/this.trueHeight?i/this.trueHeight:i/this.trueWidth,t=t*i,t>0?e+=Math.abs(t):e>Math.abs(t)&&(e-=Math.abs(t)),!this.checkoutImgAxis(this.x,this.y,e))return!1;this.scale=e},createCrop(t){t.preventDefault();var e="clientX"in t?t.clientX:t.touches?t.touches[0].clientX:0,i="clientY"in t?t.clientY:t.touches?t.touches[0].clientY:0;this.$nextTick(()=>{var s=e-this.cropX,r=i-this.cropY;if(s>0?(this.cropW=s+this.cropChangeX>this.w?this.w-this.cropChangeX:s,this.cropOffsertX=this.cropChangeX):(this.cropW=this.w-this.cropChangeX+Math.abs(s)>this.w?this.cropChangeX:Math.abs(s),this.cropOffsertX=this.cropChangeX+s>0?this.cropChangeX+s:0),!this.fixed)r>0?(this.cropH=r+this.cropChangeY>this.h?this.h-this.cropChangeY:r,this.cropOffsertY=this.cropChangeY):(this.cropH=this.h-this.cropChangeY+Math.abs(r)>this.h?this.cropChangeY:Math.abs(r),this.cropOffsertY=this.cropChangeY+r>0?this.cropChangeY+r:0);else{var o=this.cropW/this.fixedNumber[0]*this.fixedNumber[1];o+this.cropOffsertY>this.h?(this.cropH=this.h-this.cropOffsertY,this.cropW=this.cropH/this.fixedNumber[1]*this.fixedNumber[0],s>0?this.cropOffsertX=this.cropChangeX:this.cropOffsertX=this.cropChangeX-this.cropW):this.cropH=o,this.cropOffsertY=this.cropOffsertY}})},changeCropSize(t,e,i,s,r){t.preventDefault(),window.addEventListener("mousemove",this.changeCropNow),window.addEventListener("mouseup",this.changeCropEnd),window.addEventListener("touchmove",this.changeCropNow),window.addEventListener("touchend",this.changeCropEnd),this.canChangeX=e,this.canChangeY=i,this.changeCropTypeX=s,this.changeCropTypeY=r,this.cropX="clientX"in t?t.clientX:t.touches[0].clientX,this.cropY="clientY"in t?t.clientY:t.touches[0].clientY,this.cropOldW=this.cropW,this.cropOldH=this.cropH,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.fixed&&this.canChangeX&&this.canChangeY&&(this.canChangeY=0),this.$emit("change-crop-size",{width:this.cropW,height:this.cropH})},changeCropNow(t){t.preventDefault();var e="clientX"in t?t.clientX:t.touches?t.touches[0].clientX:0,i="clientY"in t?t.clientY:t.touches?t.touches[0].clientY:0;let s=this.w,r=this.h,o=0,h=0;if(this.centerBox){let c=this.getImgAxis(),a=c.x2,f=c.y2;o=c.x1>0?c.x1:0,h=c.y1>0?c.y1:0,s>a&&(s=a),r>f&&(r=f)}const[n,l]=this.checkCropLimitSize();this.$nextTick(()=>{var c=e-this.cropX,a=i-this.cropY;if(this.canChangeX&&(this.changeCropTypeX===1?this.cropOldW-c<n?(this.cropW=n,this.cropOffsertX=this.cropOldW+this.cropChangeX-o-n):this.cropOldW-c>0?(this.cropW=s-this.cropChangeX-c<=s-o?this.cropOldW-c:this.cropOldW+this.cropChangeX-o,this.cropOffsertX=s-this.cropChangeX-c<=s-o?this.cropChangeX+c:o):(this.cropW=Math.abs(c)+this.cropChangeX<=s?Math.abs(c)-this.cropOldW:s-this.cropOldW-this.cropChangeX,this.cropOffsertX=this.cropChangeX+this.cropOldW):this.changeCropTypeX===2&&(this.cropOldW+c<n?this.cropW=n:this.cropOldW+c>0?(this.cropW=this.cropOldW+c+this.cropOffsertX<=s?this.cropOldW+c:s-this.cropOffsertX,this.cropOffsertX=this.cropChangeX):(this.cropW=s-this.cropChangeX+Math.abs(c+this.cropOldW)<=s-o?Math.abs(c+this.cropOldW):this.cropChangeX-o,this.cropOffsertX=s-this.cropChangeX+Math.abs(c+this.cropOldW)<=s-o?this.cropChangeX-Math.abs(c+this.cropOldW):o))),this.canChangeY&&(this.changeCropTypeY===1?this.cropOldH-a<l?(this.cropH=l,this.cropOffsertY=this.cropOldH+this.cropChangeY-h-l):this.cropOldH-a>0?(this.cropH=r-this.cropChangeY-a<=r-h?this.cropOldH-a:this.cropOldH+this.cropChangeY-h,this.cropOffsertY=r-this.cropChangeY-a<=r-h?this.cropChangeY+a:h):(this.cropH=Math.abs(a)+this.cropChangeY<=r?Math.abs(a)-this.cropOldH:r-this.cropOldH-this.cropChangeY,this.cropOffsertY=this.cropChangeY+this.cropOldH):this.changeCropTypeY===2&&(this.cropOldH+a<l?this.cropH=l:this.cropOldH+a>0?(this.cropH=this.cropOldH+a+this.cropOffsertY<=r?this.cropOldH+a:r-this.cropOffsertY,this.cropOffsertY=this.cropChangeY):(this.cropH=r-this.cropChangeY+Math.abs(a+this.cropOldH)<=r-h?Math.abs(a+this.cropOldH):this.cropChangeY-h,this.cropOffsertY=r-this.cropChangeY+Math.abs(a+this.cropOldH)<=r-h?this.cropChangeY-Math.abs(a+this.cropOldH):h))),this.canChangeX&&this.fixed){var f=this.cropW/this.fixedNumber[0]*this.fixedNumber[1];f<l?(this.cropH=l,this.cropW=this.fixedNumber[0]*l/this.fixedNumber[1],this.changeCropTypeX===1&&(this.cropOffsertX=this.cropChangeX+(this.cropOldW-this.cropW))):f+this.cropOffsertY>r?(this.cropH=r-this.cropOffsertY,this.cropW=this.cropH/this.fixedNumber[1]*this.fixedNumber[0],this.changeCropTypeX===1&&(this.cropOffsertX=this.cropChangeX+(this.cropOldW-this.cropW))):this.cropH=f}if(this.canChangeY&&this.fixed){var u=this.cropH/this.fixedNumber[1]*this.fixedNumber[0];u<n?(this.cropW=n,this.cropH=this.fixedNumber[1]*n/this.fixedNumber[0],this.cropOffsertY=this.cropOldH+this.cropChangeY-this.cropH):u+this.cropOffsertX>s?(this.cropW=s-this.cropOffsertX,this.cropH=this.cropW/this.fixedNumber[0]*this.fixedNumber[1]):this.cropW=u}})},checkCropLimitSize(){let{cropW:t,cropH:e,limitMinSize:i}=this,s=new Array;return Array.isArray(i)?s=i:s=[i,i],t=parseFloat(s[0]),e=parseFloat(s[1]),[t,e]},changeCropEnd(t){window.removeEventListener("mousemove",this.changeCropNow),window.removeEventListener("mouseup",this.changeCropEnd),window.removeEventListener("touchmove",this.changeCropNow),window.removeEventListener("touchend",this.changeCropEnd)},calculateSize(t,e,i,s,r,o){const h=t/e;let n=r,l=o;return n<i&&(n=i,l=Math.ceil(n/h)),l<s&&(l=s,n=Math.ceil(l*h),n<i&&(n=i,l=Math.ceil(n/h))),n<r&&(n=r,l=Math.ceil(n/h)),l<o&&(l=o,n=Math.ceil(l*h)),{width:n,height:l}},endCrop(){this.cropW===0&&this.cropH===0&&(this.cropping=!1);let[t,e]=this.checkCropLimitSize();const{width:i,height:s}=this.fixed?this.calculateSize(this.fixedNumber[0],this.fixedNumber[1],t,e,this.cropW,this.cropH):{width:t,height:e};i>this.cropW&&(this.cropW=i,this.cropOffsertX+i>this.w&&(this.cropOffsertX=this.w-i)),s>this.cropH&&(this.cropH=s,this.cropOffsertY+s>this.h&&(this.cropOffsertY=this.h-s)),window.removeEventListener("mousemove",this.createCrop),window.removeEventListener("mouseup",this.endCrop),window.removeEventListener("touchmove",this.createCrop),window.removeEventListener("touchend",this.endCrop)},startCrop(){this.crop=!0},stopCrop(){this.crop=!1},clearCrop(){this.cropping=!1,this.cropW=0,this.cropH=0},cropMove(t){if(t.preventDefault(),!this.canMoveBox)return this.crop=!1,this.startMove(t),!1;if(t.touches&&t.touches.length===2)return this.crop=!1,this.startMove(t),this.leaveCrop(),!1;window.addEventListener("mousemove",this.moveCrop),window.addEventListener("mouseup",this.leaveCrop),window.addEventListener("touchmove",this.moveCrop),window.addEventListener("touchend",this.leaveCrop);let e="clientX"in t?t.clientX:t.touches[0].clientX,i="clientY"in t?t.clientY:t.touches[0].clientY,s,r;s=e-this.cropOffsertX,r=i-this.cropOffsertY,this.cropX=s,this.cropY=r,this.$emit("crop-moving",{moving:!0,axis:this.getCropAxis()})},moveCrop(t,e){let i=0,s=0;t&&(t.preventDefault(),i="clientX"in t?t.clientX:t.touches[0].clientX,s="clientY"in t?t.clientY:t.touches[0].clientY),this.$nextTick(()=>{let r,o,h=i-this.cropX,n=s-this.cropY;if(e&&(h=this.cropOffsertX,n=this.cropOffsertY),h<=0?r=0:h+this.cropW>this.w?r=this.w-this.cropW:r=h,n<=0?o=0:n+this.cropH>this.h?o=this.h-this.cropH:o=n,this.centerBox){let l=this.getImgAxis();r<=l.x1&&(r=l.x1),r+this.cropW>l.x2&&(r=l.x2-this.cropW),o<=l.y1&&(o=l.y1),o+this.cropH>l.y2&&(o=l.y2-this.cropH)}this.cropOffsertX=r,this.cropOffsertY=o,this.$emit("crop-moving",{moving:!0,axis:this.getCropAxis()})})},getImgAxis(t,e,i){t=t||this.x,e=e||this.y,i=i||this.scale;let s={x1:0,x2:0,y1:0,y2:0},r=this.trueWidth*i,o=this.trueHeight*i;switch(this.rotate){case 0:s.x1=t+this.trueWidth*(1-i)/2,s.x2=s.x1+this.trueWidth*i,s.y1=e+this.trueHeight*(1-i)/2,s.y2=s.y1+this.trueHeight*i;break;case 1:case-1:case 3:case-3:s.x1=t+this.trueWidth*(1-i)/2+(r-o)/2,s.x2=s.x1+this.trueHeight*i,s.y1=e+this.trueHeight*(1-i)/2+(o-r)/2,s.y2=s.y1+this.trueWidth*i;break;default:s.x1=t+this.trueWidth*(1-i)/2,s.x2=s.x1+this.trueWidth*i,s.y1=e+this.trueHeight*(1-i)/2,s.y2=s.y1+this.trueHeight*i;break}return s},getCropAxis(){let t={x1:0,x2:0,y1:0,y2:0};return t.x1=this.cropOffsertX,t.x2=t.x1+this.cropW,t.y1=this.cropOffsertY,t.y2=t.y1+this.cropH,t},leaveCrop(t){window.removeEventListener("mousemove",this.moveCrop),window.removeEventListener("mouseup",this.leaveCrop),window.removeEventListener("touchmove",this.moveCrop),window.removeEventListener("touchend",this.leaveCrop),this.$emit("crop-moving",{moving:!1,axis:this.getCropAxis()})},getCropChecked(t){let e=document.createElement("canvas"),i=new Image,s=this.rotate,r=this.trueWidth,o=this.trueHeight,h=this.cropOffsertX,n=this.cropOffsertY;i.onload=()=>{if(this.cropW!==0){let a=e.getContext("2d"),f=1;this.high&!this.full&&(f=window.devicePixelRatio),this.enlarge!==1&!this.full&&(f=Math.abs(Number(this.enlarge)));let u=this.cropW*f,w=this.cropH*f,d=r*this.scale*f,g=o*this.scale*f,m=(this.x-h+this.trueWidth*(1-this.scale)/2)*f,b=(this.y-n+this.trueHeight*(1-this.scale)/2)*f;switch(c(u,w),a.save(),this.fillColor&&(a.fillStyle=this.fillColor,a.fillRect(0,0,e.width,e.height)),s){case 0:this.full?(c(u/this.scale,w/this.scale),a.drawImage(i,m/this.scale,b/this.scale,d/this.scale,g/this.scale)):a.drawImage(i,m,b,d,g);break;case 1:case-3:this.full?(c(u/this.scale,w/this.scale),m=m/this.scale+(d/this.scale-g/this.scale)/2,b=b/this.scale+(g/this.scale-d/this.scale)/2,a.rotate(s*90*Math.PI/180),a.drawImage(i,b,-m-g/this.scale,d/this.scale,g/this.scale)):(m=m+(d-g)/2,b=b+(g-d)/2,a.rotate(s*90*Math.PI/180),a.drawImage(i,b,-m-g,d,g));break;case 2:case-2:this.full?(c(u/this.scale,w/this.scale),a.rotate(s*90*Math.PI/180),m=m/this.scale,b=b/this.scale,a.drawImage(i,-m-d/this.scale,-b-g/this.scale,d/this.scale,g/this.scale)):(a.rotate(s*90*Math.PI/180),a.drawImage(i,-m-d,-b-g,d,g));break;case 3:case-1:this.full?(c(u/this.scale,w/this.scale),m=m/this.scale+(d/this.scale-g/this.scale)/2,b=b/this.scale+(g/this.scale-d/this.scale)/2,a.rotate(s*90*Math.PI/180),a.drawImage(i,-b-d/this.scale,m,d/this.scale,g/this.scale)):(m=m+(d-g)/2,b=b+(g-d)/2,a.rotate(s*90*Math.PI/180),a.drawImage(i,-b-d,m,d,g));break;default:this.full?(c(u/this.scale,w/this.scale),a.drawImage(i,m/this.scale,b/this.scale,d/this.scale,g/this.scale)):a.drawImage(i,m,b,d,g)}a.restore()}else{let a=r*this.scale,f=o*this.scale,u=e.getContext("2d");switch(u.save(),this.fillColor&&(u.fillStyle=this.fillColor,u.fillRect(0,0,e.width,e.height)),s){case 0:c(a,f),u.drawImage(i,0,0,a,f);break;case 1:case-3:c(f,a),u.rotate(s*90*Math.PI/180),u.drawImage(i,0,-f,a,f);break;case 2:case-2:c(a,f),u.rotate(s*90*Math.PI/180),u.drawImage(i,-a,-f,a,f);break;case 3:case-1:c(f,a),u.rotate(s*90*Math.PI/180),u.drawImage(i,-a,0,a,f);break;default:c(a,f),u.drawImage(i,0,0,a,f)}u.restore()}t(e)};var l=this.img.substr(0,4);l!=="data"&&(i.crossOrigin="Anonymous"),i.src=this.imgs;function c(a,f){e.width=Math.round(a),e.height=Math.round(f)}},getCropData(t){this.getCropChecked(e=>{t(e.toDataURL("image/"+this.outputType,this.outputSize))})},getCropBlob(t){this.getCropChecked(e=>{e.toBlob(i=>t(i),"image/"+this.outputType,this.outputSize)})},showPreview(){if(this.isCanShow)this.isCanShow=!1,setTimeout(()=>{this.isCanShow=!0},16);else return!1;let t=this.cropW,e=this.cropH,i=this.scale;var s={};s.div={width:`${t}px`,height:`${e}px`};let r=(this.x-this.cropOffsertX)/i,o=(this.y-this.cropOffsertY)/i,h=0;s.w=t,s.h=e,s.url=this.imgs,s.img={width:`${this.trueWidth}px`,height:`${this.trueHeight}px`,transform:`scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate*90}deg)`},s.html=`
      <div class="show-preview" style="width: ${s.w}px; height: ${s.h}px,; overflow: hidden">
        <div style="width: ${t}px; height: ${e}px">
          <img src=${s.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate*90}deg)">
        </div>
      </div>`,this.$emit("real-time",s)},reload(){let t=new Image;t.onload=()=>{this.w=parseFloat(window.getComputedStyle(this.$refs.cropper).width),this.h=parseFloat(window.getComputedStyle(this.$refs.cropper).height),this.trueWidth=t.width,this.trueHeight=t.height,this.original?this.scale=1:this.scale=this.checkedMode(),this.$nextTick(()=>{this.x=-(this.trueWidth-this.trueWidth*this.scale)/2+(this.w-this.trueWidth*this.scale)/2,this.y=-(this.trueHeight-this.trueHeight*this.scale)/2+(this.h-this.trueHeight*this.scale)/2,this.loading=!1,this.autoCrop&&this.goAutoCrop(),this.$emit("img-load","success"),setTimeout(()=>{this.showPreview()},20)})},t.onerror=()=>{this.$emit("img-load","error")},t.src=this.imgs},checkedMode(){let t=1,e=this.trueWidth,i=this.trueHeight;const s=this.mode.split(" ");switch(s[0]){case"contain":this.trueWidth>this.w&&(t=this.w/this.trueWidth),this.trueHeight*t>this.h&&(t=this.h/this.trueHeight);break;case"cover":e=this.w,t=e/this.trueWidth,i=i*t,i<this.h&&(i=this.h,t=i/this.trueHeight);break;default:try{let r=s[0];if(r.search("px")!==-1){r=r.replace("px",""),e=parseFloat(r);const o=e/this.trueWidth;let h=1,n=s[1];n.search("px")!==-1&&(n=n.replace("px",""),i=parseFloat(n),h=i/this.trueHeight),t=Math.min(o,h)}if(r.search("%")!==-1&&(r=r.replace("%",""),e=parseFloat(r)/100*this.w,t=e/this.trueWidth),s.length===2&&r==="auto"){let o=s[1];o.search("px")!==-1&&(o=o.replace("px",""),i=parseFloat(o),t=i/this.trueHeight),o.search("%")!==-1&&(o=o.replace("%",""),i=parseFloat(o)/100*this.h,t=i/this.trueHeight)}}catch{t=1}}return t},goAutoCrop(t,e){if(this.imgs===""||this.imgs===null)return;this.clearCrop(),this.cropping=!0;let i=this.w,s=this.h;if(this.centerBox){const h=Math.abs(this.rotate)%2>0;let n=(h?this.trueHeight:this.trueWidth)*this.scale,l=(h?this.trueWidth:this.trueHeight)*this.scale;i=n<i?n:i,s=l<s?l:s}var r=t||parseFloat(this.autoCropWidth),o=e||parseFloat(this.autoCropHeight);(r===0||o===0)&&(r=i*.8,o=s*.8),r=r>i?i:r,o=o>s?s:o,this.fixed&&(o=r/this.fixedNumber[0]*this.fixedNumber[1]),o>this.h&&(o=this.h,r=o/this.fixedNumber[1]*this.fixedNumber[0]),this.changeCrop(r,o)},changeCrop(t,e){if(this.centerBox){let i=this.getImgAxis();t>i.x2-i.x1&&(t=i.x2-i.x1,e=t/this.fixedNumber[0]*this.fixedNumber[1]),e>i.y2-i.y1&&(e=i.y2-i.y1,t=e/this.fixedNumber[1]*this.fixedNumber[0])}this.cropW=t,this.cropH=e,this.checkCropLimitSize(),this.$nextTick(()=>{this.cropOffsertX=(this.w-this.cropW)/2,this.cropOffsertY=(this.h-this.cropH)/2,this.centerBox&&this.moveCrop(null,!0)})},refresh(){this.img,this.imgs="",this.scale=1,this.crop=!1,this.rotate=0,this.w=0,this.h=0,this.trueWidth=0,this.trueHeight=0,this.imgIsQqualCrop=!1,this.clearCrop(),this.$nextTick(()=>{this.checkedImg()})},rotateLeft(){this.rotate=this.rotate<=-3?0:this.rotate-1},rotateRight(){this.rotate=this.rotate>=3?0:this.rotate+1},rotateClear(){this.rotate=0},checkoutImgAxis(t,e,i){t=t||this.x,e=e||this.y,i=i||this.scale;let s=!0;if(this.centerBox){let r=this.getImgAxis(t,e,i),o=this.getCropAxis();r.x1>=o.x1&&(s=!1),r.x2<=o.x2&&(s=!1),r.y1>=o.y1&&(s=!1),r.y2<=o.y2&&(s=!1),s||this.changeImgScale(r,o,i)}return s},changeImgScale(t,e,i){const s=this.cropW>this.cropH?this.cropW/this.trueWidth:this.cropH/this.trueWidth;let r=this.trueWidth*i,o=this.trueHeight*i;r>=this.cropW&&o>=this.cropH?this.scale=i:(this.scale=s,r=this.trueWidth*s,o=this.trueHeight*s),this.imgIsQqualCrop||(t.x1>=e.x1&&(this.x=e.x1-(this.trueWidth-r)/2),t.x2<=e.x2&&(this.x=e.x2-(this.trueWidth-r)/2-r),t.y1>=e.y1&&(this.y=e.y1-(this.trueHeight-o)/2),t.y2<=e.y2&&(this.y=e.y2-(this.trueHeight-o)/2-o)),(r<this.cropW||o<this.cropH)&&(this.imgIsQqualCrop=!0)}},mounted(){this.support="onwheel"in document.createElement("div")?"wheel":document.onmousewheel!==void 0?"mousewheel":"DOMMouseScroll";let t=this;var e=navigator.userAgent;this.isIOS=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(i,s,r){for(var o=atob(this.toDataURL(s,r).split(",")[1]),h=o.length,n=new Uint8Array(h),l=0;l<h;l++)n[l]=o.charCodeAt(l);i(new Blob([n],{type:t.type||"image/png"}))}}),this.showPreview(),this.checkedImg()},unmounted(){window.removeEventListener("mousemove",this.moveCrop),window.removeEventListener("mouseup",this.leaveCrop),window.removeEventListener("touchmove",this.moveCrop),window.removeEventListener("touchend",this.leaveCrop),this.cancelScale()}}),A={key:0,class:"cropper-box"},I=["src"],k={class:"cropper-view-box"},N=["src"],L={key:1};function z(t,e,i,s,r,o){return p.openBlock(),p.createElementBlock("div",{class:"vue-cropper",ref:"cropper",onMouseover:e[28]||(e[28]=(...h)=>t.scaleImg&&t.scaleImg(...h)),onMouseout:e[29]||(e[29]=(...h)=>t.cancelScale&&t.cancelScale(...h))},[t.imgs?(p.openBlock(),p.createElementBlock("div",A,[p.withDirectives(p.createElementVNode("div",{class:"cropper-box-canvas",style:p.normalizeStyle({width:t.trueWidth+"px",height:t.trueHeight+"px",transform:"scale("+t.scale+","+t.scale+") translate3d("+t.x/t.scale+"px,"+t.y/t.scale+"px,0)rotateZ("+t.rotate*90+"deg)"})},[p.createElementVNode("img",{src:t.imgs,alt:"cropper-img",ref:"cropperImg"},null,8,I)],4),[[p.vShow,!t.loading]])])):p.createCommentVNode("",!0),p.createElementVNode("div",{class:p.normalizeClass(["cropper-drag-box",{"cropper-move":t.move&&!t.crop,"cropper-crop":t.crop,"cropper-modal":t.cropping}]),onMousedown:e[0]||(e[0]=(...h)=>t.startMove&&t.startMove(...h)),onTouchstart:e[1]||(e[1]=(...h)=>t.startMove&&t.startMove(...h))},null,34),p.withDirectives(p.createElementVNode("div",{class:"cropper-crop-box",style:p.normalizeStyle({width:t.cropW+"px",height:t.cropH+"px",transform:"translate3d("+t.cropOffsertX+"px,"+t.cropOffsertY+"px,0)"})},[p.createElementVNode("span",k,[p.createElementVNode("img",{style:p.normalizeStyle({width:t.trueWidth+"px",height:t.trueHeight+"px",transform:"scale("+t.scale+","+t.scale+") translate3d("+(t.x-t.cropOffsertX)/t.scale+"px,"+(t.y-t.cropOffsertY)/t.scale+"px,0)rotateZ("+t.rotate*90+"deg)"}),src:t.imgs,alt:"cropper-img"},null,12,N)]),p.createElementVNode("span",{class:"cropper-face cropper-move",onMousedown:e[2]||(e[2]=(...h)=>t.cropMove&&t.cropMove(...h)),onTouchstart:e[3]||(e[3]=(...h)=>t.cropMove&&t.cropMove(...h))},null,32),t.info?(p.openBlock(),p.createElementBlock("span",{key:0,class:"crop-info",style:p.normalizeStyle({top:t.cropInfo.top})},p.toDisplayString(t.cropInfo.width)+" × "+p.toDisplayString(t.cropInfo.height),5)):p.createCommentVNode("",!0),t.fixedBox?p.createCommentVNode("",!0):(p.openBlock(),p.createElementBlock("span",L,[p.createElementVNode("span",{class:"crop-line line-w",onMousedown:e[4]||(e[4]=h=>t.changeCropSize(h,!1,!0,0,1)),onTouchstart:e[5]||(e[5]=h=>t.changeCropSize(h,!1,!0,0,1))},null,32),p.createElementVNode("span",{class:"crop-line line-a",onMousedown:e[6]||(e[6]=h=>t.changeCropSize(h,!0,!1,1,0)),onTouchstart:e[7]||(e[7]=h=>t.changeCropSize(h,!0,!1,1,0))},null,32),p.createElementVNode("span",{class:"crop-line line-s",onMousedown:e[8]||(e[8]=h=>t.changeCropSize(h,!1,!0,0,2)),onTouchstart:e[9]||(e[9]=h=>t.changeCropSize(h,!1,!0,0,2))},null,32),p.createElementVNode("span",{class:"crop-line line-d",onMousedown:e[10]||(e[10]=h=>t.changeCropSize(h,!0,!1,2,0)),onTouchstart:e[11]||(e[11]=h=>t.changeCropSize(h,!0,!1,2,0))},null,32),p.createElementVNode("span",{class:"crop-point point1",onMousedown:e[12]||(e[12]=h=>t.changeCropSize(h,!0,!0,1,1)),onTouchstart:e[13]||(e[13]=h=>t.changeCropSize(h,!0,!0,1,1))},null,32),p.createElementVNode("span",{class:"crop-point point2",onMousedown:e[14]||(e[14]=h=>t.changeCropSize(h,!1,!0,0,1)),onTouchstart:e[15]||(e[15]=h=>t.changeCropSize(h,!1,!0,0,1))},null,32),p.createElementVNode("span",{class:"crop-point point3",onMousedown:e[16]||(e[16]=h=>t.changeCropSize(h,!0,!0,2,1)),onTouchstart:e[17]||(e[17]=h=>t.changeCropSize(h,!0,!0,2,1))},null,32),p.createElementVNode("span",{class:"crop-point point4",onMousedown:e[18]||(e[18]=h=>t.changeCropSize(h,!0,!1,1,0)),onTouchstart:e[19]||(e[19]=h=>t.changeCropSize(h,!0,!1,1,0))},null,32),p.createElementVNode("span",{class:"crop-point point5",onMousedown:e[20]||(e[20]=h=>t.changeCropSize(h,!0,!1,2,0)),onTouchstart:e[21]||(e[21]=h=>t.changeCropSize(h,!0,!1,2,0))},null,32),p.createElementVNode("span",{class:"crop-point point6",onMousedown:e[22]||(e[22]=h=>t.changeCropSize(h,!0,!0,1,2)),onTouchstart:e[23]||(e[23]=h=>t.changeCropSize(h,!0,!0,1,2))},null,32),p.createElementVNode("span",{class:"crop-point point7",onMousedown:e[24]||(e[24]=h=>t.changeCropSize(h,!1,!0,0,2)),onTouchstart:e[25]||(e[25]=h=>t.changeCropSize(h,!1,!0,0,2))},null,32),p.createElementVNode("span",{class:"crop-point point8",onMousedown:e[26]||(e[26]=h=>t.changeCropSize(h,!0,!0,2,2)),onTouchstart:e[27]||(e[27]=h=>t.changeCropSize(h,!0,!0,2,2))},null,32)]))],4),[[p.vShow,t.cropping]])],544)}const C=S(E,[["render",z],["__scopeId","data-v-9be9b9b9"]]),H={version:"1.1.2",install:function(t){t.component("VueCropper",C)},VueCropper:C};v.VueCropper=C,v.default=H,v.globalCropper=H,Object.defineProperties(v,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
