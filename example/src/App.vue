<template>
	<div class="content">
		<h1><a style="text-decoration: none" href="https://github.com/xyxiao001/vue-cropper" target="_blank">vue-cropper</a></h1>
		<p>一个基于vue的图片裁剪插件</p>
		<vueCropper ref="cropper" :img="option.img"></vueCropper>
		<div class="test">
			<button @click="changeImg" class="btn">替换图片</button>
			<label class="btn" for="uploads">我要上传</label>
			<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
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
			lists: [
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
			option: {
				img: '',
			}
    }
  },
	methods: {
		changeImg () {
			this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
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
			// 清除截图
			this.$refs.cropper.clearCrop()
		},
		finish () {
			// 输出
			this.$refs.cropper.finish()
		},

		uploadImg (e) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			var reader = new FileReader()
			reader.onload = (e) => {
				this.option.img = e.target.result
			}
			reader.readAsDataURL(file)
		}
	},
	components: {
		vueCropper
	},
	mounted () {
		this.changeImg()
	}
}
</script>

<style scoped>
  * {
	  margin: 0;
		padding: 0;
	}

	.content {
		margin: auto;
		max-width: 1200px;
		height: 500px;
	}

	.test {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 100px;
	}

	.btn {
		display: inline-block;
		line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:10px 10px 20px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
	}
</style>
