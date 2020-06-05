import Vue from 'vue'
import VueRouter from 'vue-router'
import test1 from '../views/test1.vue'

Vue.use(VueRouter)

import main from './main.routes'
import tag from './tag.routes'

const routes = [
  {
    name: 'test',
    path: '/test',
    component: () => ({
      component: import('../views/test.vue'),
        loading: test1,
        delay: 10000
    })
    // component: () => import('@/views/test.vue')
  },
  ...main,
  ...tag,
  {
    path: '*',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '找不到页面'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }),
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-掘金'
  }
  next()
})
export default router
