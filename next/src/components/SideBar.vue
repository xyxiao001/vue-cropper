<template>
  <nav class="side-bar">
    <p>
      <a class="title" href="https://github.com/xyxiao001/vue-cropper" target="_blank">vue-cropper</a>
    </p>
    <section class="menu-list">
      <section class="menu-item" v-for="item in nav" :key="item.name">
        <router-link class="item-link" :to="item.path">{{ item.name }}</router-link>
      </section>
    </section>
  </nav>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const nav = [
    {
      name: '快速开始',
      path: '/guide'
    },
    {
      name: '参数',
      path: '/props'
    },
    {
      name: '方法',
      path: '/methods'
    },
    {
      name: '事件',
      path: '/event'
    },
    {
      name: '基础例子',
      path: '/demo-basic'
    },
    {
      name: '替换loading例子',
      path: '/demo-loading'
    },
    {
      name: '本地上传图片例子',
      path: '/demo-drag'
    },
    {
      name: '截图框操作例子',
      path: '/demo-crop'
    },
    {
      name: '图片控制例子',
      path: '/demo-img'
    },
    {
      name: '图片滤镜',
      path: '/demo-filter'
    },
    {
      name: '图片旋转',
      path: '/demo-rotate'
    },
    {
      name: '更新日志',
      path: '/changelog'
    }
  ]
</script>

<style lang="scss">
  @import "../assets/color.scss";
  .side-bar {
    flex-wrap: wrap;
    justify-content: center;
    width: 160px;
    flex-shrink: 0;
    padding: 24px 0 0;
    background-color: white;
  }

  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    font-size: 26px;
    background-image: -webkit-linear-gradient(
      left,
      #3498db,
      #f47920 10%,
      #d71345 20%,
      #f7acbc 30%,
      #ffd400 40%,
      #3498db 50%,
      #f47920 60%,
      #d71345 70%,
      #f7acbc 80%,
      #ffd400 90%,
      #3498db
    );
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
  }

  .menu-list {
    margin-top: 30px;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    background: #fff;
    line-height: 46px;
    transition: background .3s cubic-bezier(.645,.045,.355,1),width .15s cubic-bezier(.645,.045,.355,1);
  }

  .menu-item {
    position: relative;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    a {
      position: relative;
      display: block;
      padding-left: 24px;
      color: $G100;
      span {
        font-size: 12px;
        margin-left: 6px;
        font-weight: 400;
        opacity: .67;
      }
      &::before {
        position: absolute;
        background-color: transparent;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        content: "";
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border-right: 3px solid $B50;
        transform: scaleY(0);
        opacity: 0;
        transition: opacity .15s cubic-bezier(.215,.61,.355,1),-webkit-transform .15s cubic-bezier(.215,.61,.355,1);
        transition: transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);
        z-index: 100;
      }
      &.router-link-active {
        color: $B50;
      }
      &.router-link-active::before {
        background-color: $B10;
        opacity: 0.2;
      }
      &.router-link-active::after {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  }

  .item-link {
    &:hover {
      cursor: pointer;
      color: $B50;
    }
  }
</style>