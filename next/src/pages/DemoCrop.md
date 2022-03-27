#  截图框操作例子

### 修改截图框颜色
:::demo
```html
<vue-cropper 
  ref="cropper"
  :crop-color="cropColor"
  :wrapper="wrapper"
  :crop-layout="cropLayout"
  img="https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg">
</vue-cropper>
<section class="control">
  <p>修改截图框颜色</p>
  <input type="color" v-model="cropColor" />
</section>
<section class="control">
  <p>容器样式</p>
  <p>
    {{ wrapper }}
  </p>
</section>
<section class="control">
  <p>截图框样式</p>
  <p>
    {{ cropLayout }}
  </p>
</section>
<el-button :loading="loading" @click="click">获取截图</el-button>
```

```js
<script setup>
  import { ref, reactive, computed} from 'vue'
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

  const cropColor = ref('#ffffff')

  const wrapper = reactive({
    width: '400px',
    height: '400px'
  })

  const cropLayout = reactive({
    width: 300,
    height: 300
  })
</script>
```
:::

<script setup>
  import { ref, reactive, computed} from 'vue'
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

  const cropColor = ref('#ffffff')

  const wrapper = reactive({
    width: '400px',
    height: '400px'
  })

  const cropLayout = reactive({
    width: 300,
    height: 300
  })
</script>

<style lang="scss" scoped>
  .control {
    display: flex;
    align-items: center;
    margin: 30px 0;
  }
   
  P {
    margin: 0;
    margin-right: 10px;
  }
</style>
