import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import main from './main.routes'
import tag from './tag.routes'

const routes = [
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/test.vue')
  },
  ...main,
  ...tag
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }),
})
// router.beforeEach()
export default router
