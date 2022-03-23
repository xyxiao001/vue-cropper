#  拖拽图片渲染例子

### 功能展示
#### 选择一张本地图片拖拽到截图区域
:::demo
```html
<vue-cropper 
  ref="cropper"
  :img="currentImg"
  @img-upload="handleUpload"
>
</vue-cropper>
<el-button :loading="loading" @click="click">获取截图</el-button>
```

```js
<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const currentImg = ref('https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg')
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
</script>

```
:::

<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const currentImg = ref('https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg')
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
</script>

<style lang="scss" scoped>
  button {
    margin-top: 30px;
  }
</style>
