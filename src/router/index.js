import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import baseHeader from './baseHeader'
import tag from './tag'


console.log(baseHeader);


const routes = [
  {
    path: '/',
    redirect: '/home/recommended',
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
  {
    path: '/user/:id',
    name: 'user',
    props: true,
    component: () => import('@/views/user/user.vue'),
  },
  {
    path: '/book/:id',
    name: 'user',
    props: true,
    component: () => import('@/views/books/book.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/feedback.vue'),
  },
  ...baseHeader,
  ...tag
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
