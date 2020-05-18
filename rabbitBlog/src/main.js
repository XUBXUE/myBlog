import Vue from 'vue'
import App from './app.vue'
import router from './router'
import './assets/styles/reset.scss'
import './assets/font/iconfont.css'
import rem from './lib/rem'
import fetch from './lib/fetch'
import autoLoad from './components/autoLoad'

rem();
//自动加载全局组件
autoLoad.startLoad();
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')