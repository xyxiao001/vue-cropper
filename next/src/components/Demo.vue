<template>
  <div class="at-component__container">
    <div class="at-component__sample">
      <slot name="demo"></slot>
    </div>
    <div class="at-component__code" v-show="isShow">
      <slot name="sourceCode"></slot>
    </div>
    <a class="at-component__code-toggle" @click="isShow = !isShow">{{ isShow ? '隐藏代码' : '显示代码' }}</a>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const isShow = ref(true)
</script>

<style lang="scss" scoped>
  .btn-copy {
    display: none;
    position: absolute;
    top: 16px;
    right: 16px;
    transition: all .3s;

    &:hover {
      color: #6190E8;
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  .at-component__code:hover {
    .btn-copy {
      display: block;
      animation: fadeIn .3s both;
    }
  }
</style>