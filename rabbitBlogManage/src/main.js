import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/styles/reset.scss'
import './assets/font/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import autoLoad from './components/autoLoad'
import fetch from './lib/fetch'

//自动加载全局组件
autoLoad.startLoad()
Vue.use(require('vue-cookies'))
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch
router.beforeEach((to, from, next) => {
  if(localStorage.getItem('token')){
    next()
  } else {
    if(to.fullPath === '/'){
      // 跳转登录页 清除 token
      if(localStorage.getItem('token')){
        localStorage.removeItem('token')
      }
      next()
    } else {
      next('/')
    }
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')