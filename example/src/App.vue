<template>
	<div class="content">
		<h1>vue-cropper</h1>
		<p>一个基于vue的图片裁剪插件</p>
		<vueCropper ref="cropper" :img="option[num].img"></vueCropper>
		<button @click="changeImg">改变图片</button>
	</div>
</template>

<script>
import vueCropper from './vue-cropper'
export default {
  data: function () {
    return {
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
</style>
