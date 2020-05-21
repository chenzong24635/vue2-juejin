import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import baseHeader from './baseHeader.routes'
import main from './main.routes'
import tag from './tag.routes'


/* const routerList = []  // 路由数组 - 存放所有路由
function importAll(routerArr){
    // 该函数用于将所有分区路由中的路由添加到路由数组
    routerArr.keys().forEach( key => {
        console.log(key)
        routerList.push(routerArr(key).default)
    })
}
importAll(require.context('.',true,/\.routes\.js/))
console.log(...routerList); */


const routes = [
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/test.vue')
  },
  ...main,
  ...baseHeader,
  ...tag
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
