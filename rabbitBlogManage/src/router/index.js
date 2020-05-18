import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/login')
    },
    {
      path: '/home',
      name: 'layout',
      component: () => import('@/pages/layout/layout'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/pages/index')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('@/pages/list/list')
        },
        {
          path: 'article/:type',
          name: 'article',
          component: () => import('@/pages/article/article')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})



