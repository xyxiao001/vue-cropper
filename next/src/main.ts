import { createApp } from 'vue'
import App from './App.vue'
import Guide from './pages/Guide.md'
import Props from './pages/Props.md'
import Methods from './pages/Methods.md'
import Event from './pages/Event.md'
import ChangeLog from './pages/ChangeLog.md'
import DemoBasic from './pages/DemoBasic.md'
import DemoLoading from './pages/DemoLoading.md'
import DemoDrag from './pages/DemoDrag.md'
import DemoCrop from './pages/DemoCrop.md'
import DemoImg from './pages/DemoImg.md'
import Demo from './components/Demo.vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueCropper from '../lib';
// import VueCropper from 'vue-cropper';
// import { VueCropper } from 'vue-cropper';
// import 'vue-cropper/dist/index.css'


const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      name: '',
      path: '/',
      redirect: '/guide'
    },
    {
      name: 'Guide',
      path: '/guide',
      component: Guide,
    },
    {
      name: 'Props',
      path: '/props',
      component: Props,
    },
    {
      name: 'Methods',
      path: '/methods',
      component: Methods,
    },
    {
      name: 'Event',
      path: '/event',
      component: Event,
    },
    {
      name: 'ChangeLog',
      path: '/changelog',
      component: ChangeLog,
    },
    {
      name: 'DemoBasic',
      path: '/demo-basic',
      component: DemoBasic,
    },
    {
      name: 'DemoLoading',
      path: '/demo-loading',
      component: DemoLoading,
    },
    {
      name: 'DemoDrag',
      path: '/demo-drag',
      component: DemoDrag,
    },
    {
      name: 'DemoCrop',
      path: '/demo-crop',
      component: DemoCrop,
    },
    {
      name: 'DemoImg',
      path: '/demo-img',
      component: DemoImg,
    },
  ], // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(ElementPlus)
app.use(VueCropper)
app.use(router)
app.component('demo', Demo)
app.mount('#app')