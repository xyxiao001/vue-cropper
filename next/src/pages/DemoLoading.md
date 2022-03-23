#  替换 loading 样式例子

### 功能展示
:::demo
```html
<vue-cropper 
  ref="cropper"
  :img="currentImg">
  <template #loading>
    <p>加载中...</p>
  <template>
</vue-cropper>
<el-button @click="changeImg">切换图片</el-button>
```

```js
<script setup>
  import { ref } from 'vue'
  const currentImg = ref('')
  const list = [
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_2e7480001384708367aa1.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-i-0813_80f34c63344d44c292dacf4608c7b258.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_48b61ee1b6b34fe945246cd1ccc4243d.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg'
  ]

  const changeImg = () => {
    const index = Math.round(Math.random() * list.length)
    currentImg.value = list[index]
  }

  changeImg()
</script>
```
:::

<script setup>
  import { ref } from 'vue'
  const currentImg = ref('')
  const list = [
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_2e7480001384708367aa1.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-i-0813_80f34c63344d44c292dacf4608c7b258.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_48b61ee1b6b34fe945246cd1ccc4243d.jpeg',
    'https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_2f07496a52314c3e024eaafaba73dd35.jpeg'
  ]

  const changeImg = () => {
    const index = ~~(Math.random() * list.length - 1)
    if (currentImg.value === list[index]) {
      changeImg()
    } else {
      currentImg.value = list[index]
    }
  }

  changeImg()
</script>

<style lang="scss" scoped>
  button {
    margin-top: 30px;
  }
</style>
