#  基础例子

### 基础功能展示
:::demo
```html
<section class="box">
  <vue-cropper 
    ref="cropper"
    img="https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg">
  </vue-cropper>
</section>
<el-button :loading="loading" @click="click">获取截图</el-button>
```

```js
<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const loading = ref(false)
  const click = () => {
    ref.value = true;
    cropper.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      ref.value = false;
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

  const cropper = ref()
  const loading = ref(false)
  const click = () => {
    ref.value = true;
    cropper.value.getCropData().then(res => {
      open(res)
    }).finally(() => {
      ref.value = false;
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
</style>
