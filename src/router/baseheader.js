// import homeHeader from './homeHeader' //首页的二级导航

const Home = () => import('@/views/home/home.vue')
const Pins = () => import('@/views/pins/pins.vue')
const Topics = () => import('@/views/topics/topics.vue')
const Books = () => import('@/views/books/books.vue')
const Events = () => import('@/views/events/events.vue')

//共用的头部导航路由

const baseHeader = [
  {
    path: '/home/:id',
    props: true,
    // redirect: '/home/recommended',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home,
    /* children: [
      ...homeHeader
    ] */
  },
  {
    path: '/pins',
    name: 'pins',
    meta: {
      title: '沸点'
    },
    component: Pins
  },
  {
    path: '/topics',
    name: 'topics',
    meta: {
      title: '话题'
    },
    component: Topics
  },
  {
    path: '/books/:id?',
    name: 'books',
    props: true,
    meta: {
      title: '小册'
    },
    component: Books
  },
  {
    path: '/events/:id',
    name: 'events',
    props: true,
    meta: {
      title: '活动'
    },
    component: Events
  }
]
export default baseHeader