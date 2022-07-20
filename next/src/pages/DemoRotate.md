#  图片旋转示例

### 图片控制
:::demo
```html
<vue-cropper 
  :center-box="centerBox"
  :default-rotate="rotate"
  :wrapper="wrapper"
  ref="cropper"
  img="https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/e140e367ab964968a3e1a3ab73a469e9.jpeg~tplv-hhc0kcolqq-image-v7:1920:q50.image"
>
</vue-cropper>
<p>
  <el-checkbox v-model="centerBox" label="图片能否超过截图框" size="large" />
</p>
<p>
  <span>图片角度--</span>
  <span>{{ rotate }}</span>
  <el-slider v-model="rotate" :max="360" />
</p>
<el-button :loading="loading" @click="click">获取截图</el-button>
```

```js
<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
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
</script>
```
:::

<script setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const loading = ref(false)
  const centerBox = ref(true)
  const rotate = ref(30)
  const wrapper = {
    width: '500px',
    height: '500px'
  }
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
</script>

<style lang="scss" scoped>
  button {
    margin-top: 30px;
  }
</style>

