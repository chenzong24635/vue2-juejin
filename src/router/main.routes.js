export default [
  {
    path: '/',
    redirect: { name: 'timeline', params: { id: 'recommended' }}
  },
  {
    path: '/timeline/:id?',
    props: true,
    name: 'timeline',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/timeline/index.vue'),
  },
  {
    path: '/pins/:id?',
    name: 'pins',
    props: true,
    meta: {
      title: '沸点'
    },
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/topics',
    name: 'topics',
    meta: {
      title: '话题'
    },
    component: () => import('@/views/topics/index.vue')
  },
  {
    path: '/books/:id?',
    name: 'books',
    props: true,
    meta: {
      title: '小册'
    },
    component: () => import('@/views/books/index.vue')
  },
  {
    path: '/events/:id?',
    name: 'events',
    props: true,
    meta: {
      title: '活动'
    },
    component: () => import('@/views/events/index.vue')
  },
  {
    path: '/pin/:id?',
    name: 'pin',
    props: true,
    meta: {
      title: '沸点'
    },
    component: () => import('@/views/pins/pin.vue')
  },
  {
    path: '/topic/:id?',
    name: 'topic',
    props: true,
    meta: {
      title: '话题'
    },
    component: () => import('@/views/topics/topic.vue')
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
    path: '/post/:id',
    name: 'post',
    props: true,
    meta: {
      title: ''
    },
    component: () => import('@/views/post/index.vue')
  },
]

