<template>
	<div class="content">
		<h1><a class="title" href="https://github.com/xyxiao001/vue-cropper" target="_blank">vue-cropper</a></h1>
		<div class="show-info">
			<h2>install</h2>
			<code class="language-html">npm install vue-cropper</code>
		</div>
		<div class="show-info">
			<h2>example1 (normal)</h2>
			<div class="test">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="true"
				></vueCropper>
			</div>
			<div class="test-button">
				<button @click="changeImg" class="btn">changeImg</button>
				<label class="btn" for="uploads">upload</label>
				<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
				<button @click="startCrop" v-if="!crap" class="btn">start</button>
				<button @click="stopCrop" v-else class="btn">stop</button>
				<button @click="clearCrop" class="btn">clear</button>
				<button @click="finish('base64')" class="btn">preview(base64)</button>
				<button @click="finish('blob')" class="btn">preview(blob)</button>
				<a @click="down('base64')" class="btn" :href="downImg" download="demo">download(base64)</a>
				<a @click="down('blob')" class="btn" :href="downImg" download="demo">download(blob)</a>
			</div>
			<codes>
<div slot="body">
&lt;template>
	&lt;div class="wrapper">
	&lt;vueCropper
		ref="cropper"
		:img="option.img"
		:outputSize="option.size"
		:outputType="option.outputType"
		:info="true"
	>&lt;/vueCropper>
	&lt;/div>
	&lt;div class="test-button">
	&lt;button @click="changeImg" class="btn">changeImg&lt;/button>
	&lt;label class="btn" for="uploads">upload&lt;/label>
	&lt;input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
	 accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
	&lt;button @click="startCrop" v-if="!crap" class="btn">start&lt;/button>
	&lt;button @click="stopCrop" v-else class="btn">stop&lt;/button>
	&lt;button @click="clearCrop" class="btn">clear&lt;/button>
	&lt;button @click="finish('base64')" class="btn">preview(base64)&lt;/button>
	&lt;button @click="finish('blob')" class="btn">preview(blob)&lt;/button>
	&lt;a @click="down('base64')" class="btn" :href="downImg" download="demo">download(base64)&lt;/a>
	&lt;a @click="down('blob')" class="btn" :href="downImg" download="demo">download(blob)&lt;/a>
	&lt;/div>
&lt;/template>
&lt;script>
import vueCropper from 'vue-cropper'

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
				}
			],
			option: {
				img: '',
				size: 0.8,
				outputType: 'jpeg'
			},
			downImg: '#'
		}
	},
	methods: {
		changeImg () {
			this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
		},
		startCrop () {
			// start
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			//  stop
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
		clearCrop () {
			// clear
			this.$refs.cropper.clearCrop()
		},
		finish (type) {
			// 输出
			window.open(type === 'blob' ? this.$refs.cropper.getCropBlob() : this.$refs.cropper.getCropDate())
		},

		down (type) {
			// e.preventDefault()
			// 输出
			this.downImg = type === 'blob' ? this.$refs.cropper.getCropBlob() : this.$refs.cropper.getCropDate()
		},

		uploadImg (e) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
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
}
&lt;/script>
</div>
			</codes>
		</div>
		<div class="show-info">
			<h2>example2 (auto crop, hide crop box info)</h2>
			<div class="test">
				<vueCropper
					ref="cropper2"
					:img="example2.img"
					:outputSize="example2.size"
					:outputType="example2.outputType"
					:info="example2.info"
					:canScale="example2.canScale"
					:autoCrop="example2.autoCrop"
					:autoCropWidth="example2.width"
					:autoCropHeight="example2.height"
				></vueCropper>
			</div>
			<label class="btn" for="upload2">upload</label>
			<input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
			<button @click="finish2('base64')" class="btn">preview(base64)</button>
			<codes>
<div slot="body">
&lt;vueCropper
	ref="cropper2"
	:img="example2.img"
	:outputSize="example2.size"
	:outputType="example2.outputType"
	:info="example2.info"
	:canScale="example2.canScale"
	:autoCrop="example2.autoCrop"
	:autoCropWidth="example2.width"
	:autoCropHeight="example2.height"
>&lt;/vueCropper>
&lt;script>
export default {
  data: function () {
    return {
			example2: {
				img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
				info: false,
				size: 1,
				outputType: 'jpeg',
				canScale: false,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 300,
				autoCropHeight: 250,
			}
		}
&lt;/script>
</div>
			</codes>
		</div>
	</div>
</template>

<script>
import vueCropper from './vue-cropper'
import codes from './code'

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
				size: 0.8,
				outputType: 'png'
			},
			example2: {
				img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
				info: false,
				size: 1,
				outputType: 'jpeg',
				canScale: false,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				width: 300,
				height: 250,
			},
			downImg: '#'
    }
  },
	methods: {
		changeImg () {
			this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
		},
		startCrop () {
			// start
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			//  stop
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
		clearCrop () {
			// clear
			this.$refs.cropper.clearCrop()
		},
		finish (type) {
			// 输出
			window.open(type === 'blob' ? this.$refs.cropper.getCropBlob() : this.$refs.cropper.getCropDate())
		},
		finish2 (type) {
			window.open(type === 'blob' ? this.$refs.cropper2.getCropBlob() : this.$refs.cropper2.getCropDate())
		},
		down (type) {
			// e.preventDefault()
			// 输出
			this.downImg = type === 'blob' ? this.$refs.cropper.getCropBlob() : this.$refs.cropper.getCropDate()
		},

		uploadImg (e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				if (num === 1) {
					this.option.img = e.target.result
				} else if (num === 2) {
					this.example2.img = e.target.result
				}
			}
			reader.readAsDataURL(file)
		}
	},
	components: {
		vueCropper,
		codes
	},
	mounted () {
		this.changeImg()
		// hljs.configure({useBR: true})
		var list = [].slice.call(document.querySelectorAll('pre code'))
		list.forEach((val, index) => {
		  hljs.highlightBlock(val)
		})
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
		margin-bottom: 100px;
	}

	.test-button {
		display: flex;
		flex-wrap: wrap;
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
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
		text-decoration: none;
		user-select: none;
	}

	.des {
		line-height: 30px;
	}

	code.language-html {
		padding: 10px 20px;
		margin: 10px 0px;
		display: block;
		background-color: #333;
		color: #fff;
		overflow-x: auto;
		font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
		border-radius: 5px;
		white-space: pre;
	}

	.show-info {
		margin-bottom: 50px;
	}

	.show-info h2 {
		line-height: 50px;
	}

	/*.title, .title:hover, .title-focus, .title:visited {
		color: black;
	}*/

	.title {
		display: block;
		text-decoration: none;
		text-align: center;
		line-height: 1.5;
		margin: 20px 0px;
		background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
		font-size: 40px;
	}

	.test {
	  height: 500px;
	}

	@keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

</style>
