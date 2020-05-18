import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index/index')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/about')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/detail/detail')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404/404')
    }
  ]
})



