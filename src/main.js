import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import globalComponent from '@/components/globalComponent.js'
import utils from '@/libs/util.js'

Vue.filter('dateDis', function (value) {
  return utils.dateDis(value)
})

import VueScroller from 'vue-scroller'
Vue.use(VueScroller).use(globalComponent)
Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$utils = utils;
// import './components/globalComponent'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
