<template>
	<div class="vue-cropper" ref="cropper">
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
					>
			</div>
		</div>
		<div
			class="cropper-drag-box"
		  :class="{'cropper-move': move}"
			@mousedown="startMove"
      @touchstart="startMove"
			@mouseover="scaleImg"
			@mouseout="cancleScale"
			>
		</div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
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
			canScale: true
    }
  },
	props: {
		img: {
			type: String,
			default: ''
		}
	},
	watch: {
		// 如果图片改变， 重新布局
		img () {
			this.loading = true
			this.scale = 1
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
			if (this.move) {
				// 开始移动
				window.addEventListener('mousemove', this.moveImg)
      	window.addEventListener('touchmove', this.moveImg)
      	window.addEventListener('mouseup', this.leaveImg)
      	window.addEventListener('touchend', this.leaveImg)
				this.moveX = (event.clientX ? event.clientX : event.touches[0].clientX) - this.x
	      this.moveY = (event.clientY ? event.clientY : event.touches[0].clientY) - this.y
			}
		},
		// 移动图片
		moveImg (e) {
			var nowX = event.clientX ? event.clientX : event.touches[0].clientX
      var nowY = event.clientY ? event.clientY : event.touches[0].clientY
			this.$nextTick(() => {
				this.x = ~~(nowX - this.moveX)
				this.y = ~~(nowY - this.moveY)
			})
		},
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
		cancleScale () {
			if (this.canScale) {
				window.removeEventListener('mousewheel', this.changeSize)
			}
		},
		// 改变大小函数
		changeSize (e) {
			var change = event.deltaY
			change < 0 ? this.scale += 0.1 : this.scale > 0.1 ? this.scale -= 0.1 : this.scale
			event.preventDefault()
		},
		// reload 图片布局函数
		reload () {
			// 得到外层容器的宽度高度
			let w =  window.getComputedStyle(this.$refs.cropper).width.replace('px', '')
			let h =  window.getComputedStyle(this.$refs.cropper).height.replace('px', '')

			// 存入图片真实高度
			this.trueWidth = this.$refs.cropperImg.width
			this.trueHeight = this.$refs.cropperImg.height

			if (this.trueWidth > w) {
				// 如果图片宽度大于容器宽度
				this.scale = w / this.trueWidth
			}

			if (this.trueHeight * this.scale > h) {
				this.scale = h / this.trueHeight
			}

			this.$nextTick(() => {
				// this.x = this.trueWidth * (this.scale - 1)
				this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (w - this.trueWidth * this.scale) / 2
				this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (h - this.trueHeight * this.scale) / 2
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
		height: 500px;
		box-sizing: border-box;
		user-select: none;
		direction: ltr;
		touch-action: none;
		overflow: hidden;
  	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}

	.cropper-box, .cropper-box-canvas, .cropper-drag-box {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.cropper-box-canvas img {
		position: relative;
	}

	.crapper-drag-box {
		z-index: 2;
	}

	.cropper-move {
		cursor: move;
	}
</style>
