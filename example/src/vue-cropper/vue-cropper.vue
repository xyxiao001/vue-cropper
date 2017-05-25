<template>
	<div class="vue-cropper" ref="cropper">
		<div class="cropper-box">
			<div class="cropper-box-canvas"
			 	v-show="!loading"
				:style="{
					'width': trueWidth + 'px',
					'height': trueHeight + 'px',
					'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x + 'px,' + y + 'px,' + '0)'
					}">
				<img
					:src="img"
					alt="cropper-img"
					ref="cropperImg"
					>
			</div>
		</div>
		<div class="cropper-move"></div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
			scale: 1,
			x: 0,
			y: 0,
			loading: true,
			trueWidth: 0,
			trueHeight: 0
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
			this.$refs.cropperImg.onload = () => {
        // 图片加载成功后布局
				this.reload()
      }
		}
	},
	methods: {
		// reload 图片布局函数
		reload () {
			// 得到外层容器的宽度高度
			let w =  window.getComputedStyle(this.$refs.cropper).width.replace('px', '') - 4
			let h =  window.getComputedStyle(this.$refs.cropper).height.replace('px', '') - 4

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
		padding: 2px;
		box-sizing: border-box;
		user-select: none;
		direction: ltr;
		touch-action: none;
		overflow: hidden;
  	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}

	.cropper-box, .cropper-box-canvas, .cropper-move {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.cropper-box-canvas img {
		position: relative;
	}

	.cropper-move {
		cursor: move;
	}
</style>
