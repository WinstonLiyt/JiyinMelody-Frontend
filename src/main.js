import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 导入 Vuex 的状态管理库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import axios from 'axios'
import * as auth from './utils/auth'
import 'video.js/dist/video-js.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import "tailwindcss/tailwind.css"
import '@fortawesome/fontawesome-free/css/all.css'

// 在 Vue 的原型上设置 axios 为全局实例
Vue.prototype.$axios = axios

// 使用 ElementUI 和 VueVideoPlayer 插件
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)

// 路由 beforeEach 钩子，用于处理认证
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) { // 检查路由是否需要登录
    console.log('访问需要登录')
    // 检查 cookie 中是否有用户信息
    if (auth.getUserInfo()) { 
      console.log('在 cookie 中找到了用户信息')
      next()
    } else {
      console.log('在 cookie 中没有找到用户信息')
      // 如果没有用户信息，重定向到登录页面
      next({ path: '/login' }) 
    }
  } else {
    // 如果不需要登录，则继续访问该路由
    next() 
  }
})


new Vue({
  router,
  store, // 使用 Vuex 状态管理库
  render: h => h(App)
}).$mount('#app')