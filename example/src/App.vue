<template>
	<div class="content">
		<h1>vue-cropper</h1>
		<p>一个基于vue的图片裁剪插件</p>
		<vueCropper ref="cropper" :img="option.img3"></vueCropper>
	</div>
</template>

<script>
import vueCropper from './vue-cropper'
export default {
  data: function () {
    return {
			option: {
				img1: 'https://fengyuanchen.github.io/cropper/images/picture.jpg',
				img2: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg',
				img3: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
			}
    }
  },
	components: {
		vueCropper
	},
	mounted () {
	}
}
</script>

<style scoped>
	.content {
		margin: auto;
		max-width: 1200px;
	}
</style>
