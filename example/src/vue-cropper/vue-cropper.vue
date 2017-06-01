<template>
	<div class="vue-cropper" ref="cropper">
		<img
			:src="img"
		  ref="cropperOutput"
			style="display: none"
			crossOrigin = "*"
		/>
		<div class="cropper-box">
			<div class="cropper-box-canvas"
			 	v-show="!loading"
				:style="{
					'width': trueWidth + 'px',
					'height': trueHeight + 'px',
					'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x / scale + 'px,' + y / scale + 'px,' + '0)'
					}">
				<img
					:src="img"
					alt="cropper-img"
					ref="cropperImg"
					crossOrigin = "*"
					/>
			</div>
		</div>
		<div
			class="cropper-drag-box"
		  :class="{'cropper-move': move && !crop, 'cropper-crop': crop, 'cropper-modal': cropping}"
			@mousedown="startMove"
      @touchstart="startMove"
			@mouseover="scaleImg"
			@mouseout="cancleScale"
			>
			</div>
			<div
				v-show="cropping"
				class="cropper-crop-box"
				:style="{
					'width': cropW + 'px',
					'height': cropH + 'px',
					'transform': 'translate3d('+ cropOffsertX + 'px,' + cropOffsertY + 'px,' + '0)'
				}">
				<span class="cropper-view-box">
					<img
					:style="{
						'width': trueWidth + 'px',
						'height': trueHeight + 'px',
						'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ (x - cropOffsertX) / scale  + 'px,' + (y - cropOffsertY) / scale + 'px,' + '0)'
						}"
						:src="img"
						alt="cropper-img"
						/>
				</span>
				<span
				  class="cropper-face cropper-move"
					@mousedown="cropMove"
		      @touchstart="cropMove"
				></span>
				<span class="crop-info" :style="{'top': cropInfo}">{{  this.cropW }} × {{ this.cropH }}</span>
				<span class="crop-line line-w"></span>
				<span class="crop-line line-a"></span>
				<span class="crop-line line-s"></span>
				<span class="crop-line line-d"></span>
		</div>
	</div>
</template>

<script>
export default {
  data: function () {
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
			loading: true,
			// 图片真实宽度
			trueWidth: 0,
			// 图片真实高度
			trueHeight: 0,
			// 是否可以拖动图片
			move: true,
			// 移动的x
			moveX: 0,
			// 移动的y
			moveY: 0,
			// 是否开启滚轮放大缩小
			canScale: true,
			// 开启截图
			crop: false,
			// 正在截图
			cropping: false,
			// 裁剪框大小
			cropW: 0,
			cropH: 0,
			// 裁剪框的坐标轴
			cropX: 0,
			cropY: 0,
			cropChangeX: 0,
			cropChangeY: 0,
			cropOffsertX: 0,
			cropOffsertY: 0
    }
  },
	props: {
		img: {
			type: String,
			default: ''
		},
		// 输出图片压缩比
		outputSize: {
			type: Number,
			default: 1
		},
		outputType: {
			type: String,
			default: 'jpeg'
		}
	},
	computed: {
		cropInfo () {
			return this.cropOffsertY > 20 ? '-21px' : '1px'
		}
	},
	watch: {
		// 如果图片改变， 重新布局
		img () {
			this.loading = true
			this.scale = 1
			this.clearCrop()
			this.$refs.cropperImg.onload = () => {
        // 图片加载成功后布局
				this.reload()
      }
		}
	},
	methods: {
		// 当按下鼠标键
		startMove (e) {
			// 如果move 为true 表示当前可以拖动
			if (this.move && !this.crop) {
				// 开始移动
				window.addEventListener('mousemove', this.moveImg)
      	window.addEventListener('mouseup', this.leaveImg)
				window.addEventListener('touchmove', this.moveImg)
      	window.addEventListener('touchend', this.leaveImg)
				this.moveX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.x
	      this.moveY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.y
			} else {
				// 截图ing
				this.cropping = true
				// 绑定截图事件
				window.addEventListener('mousemove', this.createCrop)
				window.addEventListener('mouseup', this.endCrop)
				window.addEventListener('touchmove', this.createCrop)
				window.addEventListener('touchend', this.endCrop)
				this.cropOffsertX = e.offsetX ? e.offsetX : (e.touches[0].pageX - this.$refs.cropper.offsetLeft)
				this.cropOffsertY = e.offsetY ? e.offsetY : (e.touches[0].pageY - this.$refs.cropper.offsetTop)
				this.cropX = e.clientX ? e.clientX : e.touches[0].clientX
				this.cropY = e.clientY ? e.clientY : e.touches[0].clientY
				this.cropChangeX = this.cropOffsertX
				this.cropChangeY = this.cropOffsertY
				this.cropW = 0
				this.cropH = 0
			}
		},
		// 移动图片
		moveImg (e) {
			var nowX = e.clientX ? e.clientX : e.touches[0].clientX
      var nowY = e.clientY ? e.clientY : e.touches[0].clientY
			this.$nextTick(() => {
				this.x = ~~(nowX - this.moveX)
				this.y = ~~(nowY - this.moveY)
			})
		},
		// 移动图片结束
		leaveImg (e) {
			window.removeEventListener('mousemove', this.moveImg)
      window.removeEventListener('touchmove', this.moveImg)
      window.removeEventListener('mouseup', this.leaveImg)
      window.removeEventListener('touchend', this.leaveImg)
		},
		// 缩放图片
		scaleImg () {
			if (this.canScale) {
				window.addEventListener('mousewheel', this.changeSize)
			}
		},
		// 移出框
		cancleScale () {
			if (this.canScale) {
				window.removeEventListener('mousewheel', this.changeSize)
			}
		},
		// 改变大小函数
		changeSize (e) {
			var change = e.deltaY
			change < 0 ? this.scale += 0.05 : this.scale > 0.05 ? this.scale -= 0.05 : this.scale
			e.preventDefault()
		},

		// 创建截图框
		createCrop (e) {
			// 移动生成大小
			var nowX = e.clientX ? e.clientX : e.touches[0].clientX
      var nowY = e.clientY ? e.clientY : e.touches[0].clientY
			this.$nextTick(() => {
				var fw = ~~(nowX - this.cropX)
				var fh = ~~(nowY - this.cropY)
				if (fw > 0) {
					this.cropW = fw
					this.cropOffsertX = this.cropChangeX
				} else {
					this.cropW = Math.abs(fw)
					this.cropOffsertX = this.cropChangeX + fw
				}

				if (fh > 0) {
					this.cropH = fh
					this.cropOffsertY = this.cropChangeY
				} else {
					this.cropH = Math.abs(fh)
					this.cropOffsertY = this.cropChangeY + fh
				}
			})
		},

		// 创建完成
		endCrop () {
			if (this.cropW === 0 && this.cropH === 0) {
				this.cropping = false
			}
			window.removeEventListener('mousemove', this.createCrop)
			window.removeEventListener('mouseup', this.endCrop)
			window.removeEventListener('touchmove', this.createCrop)
			window.removeEventListener('touchend', this.endCrop)
		},
		// 开始截图
		startCrop () {
			this.crop = true
			console.log('开始截图')
		},
		// 停止截图
		stopCrop () {
			this.crop = false
			console.log('停止截图')
		},
		// 清除截图
		clearCrop () {
			this.cropping = false
			this.cropW = 0
			this.cropH = 0
			console.log('清除截图')
		},
		// 截图移动
		cropMove (e) {
			window.addEventListener('mousemove', this.moveCrop)
			window.addEventListener('mouseup', this.leaveCrop)
			window.addEventListener('touchmove', this.moveCrop)
			window.addEventListener('touchend', this.leaveCrop)
			this.cropX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.cropOffsertX
			this.cropY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.cropOffsertY
		},

		moveCrop (e) {
			var nowX = e.clientX ? e.clientX : e.touches[0].clientX
      var nowY = e.clientY ? e.clientY : e.touches[0].clientY
			this.$nextTick(() => {
				var fw = ~~(nowX - this.cropX)
				var fh = ~~(nowY - this.cropY)
				if (fw <= 1) {
					this.cropOffsertX = 1
				} else if (~~(fw + this.cropW) > this.w) {
					this.cropOffsertX = this.w - this.cropW - 1
				} else {
					this.cropOffsertX = fw
				}

				if (fh <= 1) {
					this.cropOffsertY = 1
				} else if (~~(fh + this.cropH) > this.h) {
					this.cropOffsertY = this.h - this.cropH - 1
				} else {
					this.cropOffsertY = fh
				}
			})
		},

		leaveCrop (e) {
			window.removeEventListener('mousemove', this.moveCrop)
			window.removeEventListener('mouseup', this.leaveCrop)
			window.removeEventListener('touchmove', this.moveCrop)
			window.removeEventListener('touchend', this.leaveCrop)
		},

		// 获取转换成base64 的图片信息
		getCropDate () {
			let canvas = document.createElement('canvas')
      canvas.width = this.cropW
      canvas.height = this.cropH
			if (~~(canvas.width) !== 0) {
				let ctx = canvas.getContext('2d')
				// 图片x轴偏移
				let dx = (this.x - this.cropOffsertX) + this.trueWidth * (1 - this.scale) / 2
				// 图片y轴偏移
				let dy = (this.y - this.cropOffsertY) + this.trueHeight * (1 - this.scale) / 2
				// console.log(dx, dy)
				ctx.drawImage(this.$refs.cropperOutput, dx, dy, this.trueWidth * this.scale, this.trueHeight * this.scale)
			} else {
				canvas.width = this.trueWidth * this.scale
				canvas.height = this.trueHeight * this.scale
				let ctx = canvas.getContext('2d')
				ctx.drawImage(this.$refs.cropperOutput, 0, 0, this.trueWidth * this.scale, this.trueHeight * this.scale)
			}
      let data = canvas.toDataURL('image/' + this.outputType, this.outputSize)
			return data
		},
		// 调用canvas生成图片
		finish() {
		},
		// reload 图片布局函数
		reload () {
			// 得到外层容器的宽度高度
			this.w =  window.getComputedStyle(this.$refs.cropper).width.replace('px', '')
			this.h =  window.getComputedStyle(this.$refs.cropper).height.replace('px', '')

			// 存入图片真实高度
			this.trueWidth = this.$refs.cropperImg.width
			this.trueHeight = this.$refs.cropperImg.height

			if (this.trueWidth > this.w) {
				// 如果图片宽度大于容器宽度
				this.scale = this.w / this.trueWidth
			}

			if (this.trueHeight * this.scale > this.h) {
				this.scale = this.h / this.trueHeight
			}

			this.$nextTick(() => {
				// this.x = this.trueWidth * (this.scale - 1)
				this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2
				this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2
				this.loading = false
				console.log('reload')
			})
		},
		// 重置函数， 恢复组件置初始状态
		refresh () {
			console.log('refresh')
		}
	},
	mounted () {
		this.$refs.cropperImg.onload = () => {
			// 图片加载成功后布局
			this.reload()
		}
	}
}
</script>

<style scoped>
	.vue-cropper {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		direction: ltr;
		touch-action: none;
		overflow: hidden;
  	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}

	.cropper-box, .cropper-box-canvas, .cropper-drag-box, .cropper-crop-box, .cropper-face{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		user-select: none;
	}

	.cropper-box-canvas img {
		position: relative;
		user-select: none;
		transform: none;
	}

	.crapper-drag-box {
		/*z-index: 2*/
	}

	.cropper-move {
		cursor: move;
	}

	.cropper-crop {
    cursor: crosshair;
	}

	.cropper-modal {
		background: rgba(0, 0, 0, 0.5);
	}

	.cropper-crop-box {
		/*border: 2px solid #39f;*/
	}

	.cropper-view-box {
		display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
		outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
		user-select: none;
	}

	.cropper-view-box img {
		user-select: none;
	}

	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
		opacity: 0.1;
	}

	.crop-info {
		position: absolute;
		left: 0;
		min-width: 65px;
		text-align: center;
		color: white;
		line-height: 20px;
		background-color: rgba(0, 0, 0, 0.8);
		font-size: 12px;
	}
</style>
