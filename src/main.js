import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import componentsInstall from '@/libs/componentsInstall.js'
import utils from '@/libs/util.js'
import filters from '@/filters'
// import VueScroller from 'vue-scroller'

Vue.use(componentsInstall).use(filters)
Vue.config.productionTip = false
Vue.prototype.$utils = utils;
// Vue.prototype.$eventBus = new Vue();


// var obj = {
//   props: [],
//   template: '<div><p>{{extendData}}</p></div>',//最外层只能有一个大盒子,这个和<tempalte>对应规则一致
//   data: function () {
//     return {
//       extendData: '这是Vue.component传入Vue.extend注册的组件',
//     }
//   },
// };

// Vue.component('my-com', Vue.extend(obj))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
