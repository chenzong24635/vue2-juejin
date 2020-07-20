import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import componentsInstall from '@/libs/componentsInstall.js'
import utils from '@/libs/util.js'
import filters from '@/filters'
// import '@/components/loading/index.js'
import loading from '@/components/loading/directive.js'
// import VueScroller from 'vue-scroller'
import { init, bind } from '@/libs/custom-life-cycle/pageVisibleHidden'

import Alert from '@/components/common/alert/alert.js'
Vue.prototype.$Alert = Alert

Vue.use(componentsInstall).use(filters).use(loading)
Vue.config.productionTip = false
Vue.prototype.$utils = utils;
// Vue.prototype.$eventBus = new Vue();

init()
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

bind(vm)