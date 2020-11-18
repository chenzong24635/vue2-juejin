export default [
  {
    path: '/',
    redirect: '/A'
  },
  {
    path: '/timeline',
    redirect: '/timeline/recommended'
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
    path: '/pins/:id',
    name: 'pins',
    props: true,
    meta: {
      title: '沸点'
    },
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/pins',
    redirect: '/pins/recommended'
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
    path: '/books/:id',
    name: 'books',
    props: true,
    meta: {
      title: '小册'
    },
    component: () => import('@/views/books/index.vue')
  },
  {
    path: '/books',
    redirect: '/books/all'
  },
  {
    path: '/book/:id',
    name: 'book',
    props: true,
    component: () => import('@/views/books/book.vue'),
    meta: {
      title: '小册'
    },
  },
  {
    path: '/events/:id',
    name: 'events',
    props: true,
    component: () => import('@/views/events/index.vue'),
    meta: {
      title: '活动'
    },
  },
  {
    path: '/events',
    redirect: '/events/all'
  },
  {
    path: '/pin/:id?',
    name: 'pin',
    props: true,
    component: () => import('@/views/pins/pin.vue'),
    meta: {
      title: '沸点'
    },
  },
  {
    path: '/topic/:id?',
    name: 'topic',
    props: true,
    component: () => import('@/views/topics/topic.vue'),
    meta: {
      title: '话题'
    },
  },
  {
    path: '/user/:id/:title?',
    name: 'user',
    props: true,
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: ''
    },
  },
  {
    path: '/search/:type/:query',
    name: 'search',
    props: true,
    component: () => import('@/views/search/index.vue'),
    meta: {
      title: '搜索'
    },
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
      hideHeader: true,
      title: '重置密码'
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

