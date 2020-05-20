export default [
  {
    path: '/',
    redirect: { name: 'home', params: { id: 'recommended' }}
  },
  {
    path: '/pins',
    redirect: '/pins/recommended'
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
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/book/:id',
    name: 'user',
    props: true,
    component: () => import('@/views/books/index.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/index.vue'),
  },
]

