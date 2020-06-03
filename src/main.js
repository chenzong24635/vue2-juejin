import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import globalComponent from '@/components/globalComponent.js'
import utils from '@/libs/util.js'
import filters from '@/filters'
// import VueScroller from 'vue-scroller'

Vue.use(globalComponent).use(filters)
Vue.config.productionTip = false
Vue.prototype.$utils = utils;
// Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
