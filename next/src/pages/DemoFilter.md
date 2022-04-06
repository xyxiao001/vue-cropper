#  图片滤镜

### 图片滤镜控制
:::demo
```html
<vue-cropper 
  ref="cropper"
  :filter="filterFunc"
  img="https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg"
>
</vue-cropper>
<section class="control">
  <el-select v-model="filter">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-button :loading="loading" @click="click">获取截图</el-button>
</section>
```

```js
<script setup>
  import { ref, computed } from 'vue'
  import { grayscale, blackAndWhite, oldPhoto  } from '../../lib/filter/index.ts'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const loading = ref(false)
  const filter = ref(1);
  const options = [
     {
      label: '无滤镜',
      value: 0,
      filter: null
    },
    {
      label: '灰度滤镜',
      value: 1,
      filter: grayscale
    },
    {
      label: '黑白滤镜',
      value: 2,
      filter: blackAndWhite
    },
    {
      label: '老照片滤镜',
      value: 3,
      filter: oldPhoto
    }
  ]
  const filterFunc = computed(() => {
    return options.find(item => item.value === filter.value).filter
  })
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
  import { ref, computed } from 'vue'
  import { grayscale, blackAndWhite, oldPhoto  } from '../../lib/filter/index.ts'
  import { ElMessageBox, ElMessage } from 'element-plus'

  const cropper = ref()
  const loading = ref(false)
  const filter = ref(1);
  const options = [
     {
      label: '无滤镜',
      value: 0,
      filter: null
    },
    {
      label: '灰度滤镜',
      value: 1,
      filter: grayscale
    },
    {
      label: '黑白滤镜',
      value: 2,
      filter: blackAndWhite
    },
    {
      label: '老照片滤镜',
      value: 3,
      filter: oldPhoto
    }
  ]
  const filterFunc = computed(() => {
    return options.find(item => item.value === filter.value).filter
  })
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
    margin-left: 20px;
  }

  .control {
    margin-top: 30px;
    display: flex;
    align-items: center;
  }
</style>

