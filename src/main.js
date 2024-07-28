import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // Importing Vuex store
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
  console.log('Access requires login')
  if (to.meta.needlogin) { // Check if the route requires login
    if (auth.getuserInfo()) { // Check if user information is available
      console.log(auth.getuserInfo())
      console.log('User information found in cookies')
      next()
    } else {
      console.log('No user information in cookies')
      next({ path: '/login' }) // Redirect to login page if no user information
    }
  } else {
    next() // Continue to the route if login is not required
  }
})

// Create and mount the Vue instance
new Vue({
  router,
  store, // Use Vuex store
  render: h => h(App)
}).$mount('#app')