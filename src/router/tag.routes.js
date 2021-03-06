const Tag = () => import('@/views/tag/index.vue');
const Subscribe = () => import('@/views/tag/subscribe.vue');

const tags = [
  {
    path: '/tag/:title',
    name: 'tag',
    props: true,
    meta: {
      title: '标签'
    },
    component: Tag
  },
  {
    path: '/subscribe/:id',
    name: 'subscribe',
    meta: {
      title: '全部标签'
    },
    component: Subscribe
  },
]
export default tags

