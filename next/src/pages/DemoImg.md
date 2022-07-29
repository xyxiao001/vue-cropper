#  图片控制

### 图片限制例子
:::demo
```html
<p>图片限制截图框内</p>
<vue-cropper 
  center-box
  ref="cropper1"
  img="https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg"
>
</vue-cropper>
<el-button :loading="loading" @click="click1">获取截图</el-button>

<p>图片限制容器内</p>
<vue-cropper 
  center-wrapper
  ref="cropper2"
  img="https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg"
>
</vue-cropper>
<el-button :loading="loading" @click="click2">获取截图</el-button>
```

```js
<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper1 = ref()
  const cropper2 = ref()
  const loading = ref(false)
  const click1 = () => {
    loading.value = true;
    cropper1.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      loading.value = false;
    })
  }

  const click2 = () => {
    loading.value = true;
    cropper2.value.getCropData().then(res => {
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
</script>
```
:::

<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper1 = ref()
  const cropper2 = ref()
  const loading = ref(false)
  const click1 = () => {
    loading.value = true;
    cropper1.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      loading.value = false;
    })
  }

  const click2 = () => {
    loading.value = true;
    cropper2.value.getCropData().then(res => {
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
</script>

<style lang="scss" scoped>
  button {
    margin-top: 30px;
  }

  p {
    margin: 20px 0;
  }
</style>

