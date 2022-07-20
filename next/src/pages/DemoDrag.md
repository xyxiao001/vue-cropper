#  拖拽和本地上传图片渲染例子

### 功能展示
#### 选择一张本地图片拖拽到截图区域或者点击按钮进行图片上传
:::demo
```html
<vue-cropper 
  ref="cropper"
  :img="currentImg"
  @img-upload="handleUpload"
>
</vue-cropper>
<section class="control">
  <el-upload
    class="upload-demo"
    :auto-upload="false"
    action=""
    @change="handleChange"
    :show-file-list="false"
  >
    <template #trigger>
      <el-button type="primary">选择图片</el-button>
    </template>
  </el-upload>
  <el-button :loading="loading" @click="click">获取截图</el-button>
</section>
```

```js
<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { loadFile } from '../../lib/common.ts'

  const cropper = ref()
  const currentImg = ref('http://cdn.xyxiao.cn/Portrait_2.jpg')
  const loading = ref(false)
  const click = () => {
    loading.value = true;
    cropper.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      loading.value = false;
    })
  }

  const open = (img) => {
    ElMessageBox.alert(`<img src="${img}">`, '截图成功', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    })
  }

  const handleUpload = img => {
    currentImg.value = img
  }

  const handleChange = data => {
    loadFile(data.raw).then(res => {
      currentImg.value = res;
    }).catch(e => {
      console.error(e)
      ElMessage.error('上传失败')
    })
  }
</script>

```
:::

<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { loadFile } from '../../lib/common.ts'

  const cropper = ref()
  const currentImg = ref('https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/e140e367ab964968a3e1a3ab73a469e9.jpeg~tplv-hhc0kcolqq-image-v7:1920:q50.image')
  const loading = ref(false)
  const click = () => {
    loading.value = true;
    cropper.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      loading.value = false;
    })
  }

  const open = (img) => {
    ElMessageBox.alert(`<img src="${img}">`, '截图成功', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    })
  }

  const handleUpload = img => {
    currentImg.value = img
  }

  const handleChange = data => {
    loadFile(data.raw).then(res => {
      if (res) {
        currentImg.value = res;
      }
    }).catch(e => {
      console.error(e)
      ElMessage.error('上传失败')
    })
  }
</script>

<style lang="scss" scoped>
  button {
    margin-top: 30px;
  }

  .control {
    display: flex;

    button {
      margin-right: 30px;
    }
  }
</style>
