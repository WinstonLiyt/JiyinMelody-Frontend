import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 导入store
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

// Setup axios on the global instance
Vue.prototype.$axios = axios

// Use ElementUI and VueVideoPlayer plugins
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)

// Router beforeEach hook to handle authentication
router.beforeEach((to, from, next) => {
  console.log('需要登录才能访问')
  if (to.meta.needlogin) {
    if (auth.getuserInfo()) {
      console.log(auth.getuserInfo())
      console.log('有cookie信息')
      next()
    } else {
      console.log('无cookie信息')
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

// Create and mount the Vue instance
new Vue({
  router,
  store, // 使用store
  render: h => h(App)
}).$mount('#app')
