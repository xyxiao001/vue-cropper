<template>
	<div class="content">
		<h1>vue-cropper</h1>
		<p>一个基于vue的图片裁剪插件</p>
		<vueCropper ref="cropper" :img="option[num].img"></vueCropper>
		<div class="test">
			<button @click="changeImg" class="btn">替换图片</button>
			<button @click="startCrop" v-if="!crap" class="btn">开始截图</button>
			<button @click="stopCrop" v-else class="btn">停止截图</button>
			<button @click="clearCrop" class="btn">清除截图</button>
			<button @click="finish" class="btn">生成图片</button>
		</div>
	</div>
</template>

<script>
import vueCropper from './vue-cropper'
export default {
  data: function () {
    return {
		  crap: false,
			option: [
				{
					img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
				},
				{
					img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/bg2.jpg',
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
				}
			],
			num: 0,
    }
  },
	methods: {
		changeImg () {
			this.num = ~~(Math.random() * this.option.length)
		},
		startCrop () {
			// 开始截图
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			// 开始截图
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
		clearCrop () {
			this.$refs.cropper.clearCrop()
		},
		finish () {
			this.$refs.cropper.finish()
		}
	},
	components: {
		vueCropper
	},
	mounted () {
		this.num = ~~(Math.random() * this.option.length)
	}
}
</script>

<style scoped>
	.content {
		margin: auto;
		max-width: 1200px;
	}

	.test {
		margin-top: 10px;
		margin-bottom: 100px;
	}

	.btn {
		line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
	}
</style>
