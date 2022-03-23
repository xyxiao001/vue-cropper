<template>
  <section id="app" class="wrapper">
    <SideBar></SideBar>
    <main class="container">
      <!-- <iframe class="star" src="https://ghbtns.com/github-btn.html?user=xyxiao001&repo=vue-cropper&type=star&count=true&size=middle" frameborder="0" scrolling="0" width="160px" height="30px"></iframe> -->
      <router-view></router-view>
    </main>
  </section>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
</script>

<style lang="scss">
  @import "./assets/color.scss";
  @import "./assets/index.scss";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .wrapper {
    display: flex;
    height: 100vh;
    background-color: $G30;
  }

  .page-header {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: $G20;
    transition: all .3s;
    z-index: 100;
    margin-bottom: 25px;
  }

  .collapse {
    background-color: #fff;
    box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
    opacity: 0.98;
  }

  .container {
    display: flex;
    width: 100%;
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 24px;
    background-color: $G20;
    min-height: 100vh;
  }

  a {
    color: $B50;
  }

  .star {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .container {
    height: 100vh;
    overflow: auto;
  }
</style>