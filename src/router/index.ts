import { createRouter, createWebHashHistory } from 'vue-router';

import main from './main.routes'
import tag from './tag.routes'

const routes = [
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/A.vue'),
  },
  ...main,
  ...tag,
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '找不到页面'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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
