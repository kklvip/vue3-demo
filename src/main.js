import { createApp } from 'vue'
import ElementPlus from 'element-plus';
// import * as Icons from '@element-plus/icons'
// import { Expand,ChatRound } from '@element-plus/icons-vue'
//import locale from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/css/Reset.css'
import '@/styles/index.scss' // global css
import DiscordPicker from 'vue3-discordpicker'
//引入svg组件
// import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/index.js'
import './permission' // permission control
import videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
// 全局挂载axios
app.config.globalProperties.$axios = axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(store)
app.use(router)
app.use(videoPlay)
app.use(DiscordPicker)
app.use(ElementPlus,{ locale:zhCn })
// app.component("Expand",Expand)
// app.component("chat-round",ChatRound)
// app.component('QuillEditor', QuillEditor)
app.mount('#app')



