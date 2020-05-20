import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue();
// import './components/globalComponent'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
