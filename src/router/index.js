import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import headerMainRoutes from './baseheader'
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/test',
    component: () => import('@/views/test.vue')
  },
  {
    path: '/resetPwd',
    name: 'resetPwd',
    redirect: '/resetPwd/email',
    meta: {
      hideHeader: true
    },
    component: () => import('@/views/login/reset-password.vue'),
    children: [
      {
        path: 'email',
        name: 'email',
        component: () => import('@/views/login/reset-password-email.vue'),
        meta: {
          hideHeader: true
        },
      },
      {
        path: 'phone',
        name: 'phone',
        component: () => import('@/views/login/reset-password-phone.vue'),
        meta: {
          hideHeader: true
        },
      },
    ]
  },
  ...headerMainRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
