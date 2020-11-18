import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import componentsInstall from '@/libs/componentsInstall.js'
import utils from '@/libs/util.js'
import filters from '@/filters'
import loadingCom from '@/components/loading/index.js'
import loadingDir from '@/components/loading/directive.js'
// import VueScroller from 'vue-scroller'
import { init, bind } from '@/libs/custom-life-cycle/pageVisibleHidden'
import Alert from '@/components/common/alert/alert.js'
import xss from 'xss'
Vue.prototype.$Alert = Alert
Vue.use(componentsInstall).use(filters).use(loadingDir).use(loadingCom)
Vue.config.productionTip = false
Vue.prototype.$utils = utils;
// Vue.prototype.$eventBus = new Vue();
Vue.prototype.xss = xss
Vue.directive('xsshtml',{
  inserted(el,binding, vnode, oldVnode){
    el.innerHTML = xss(binding.value)
  },
  update(el,binding, vnode, oldVnode){
    console.log('updated');
    if(binding.value===binding.oldValue)return
    el.innerHTML = xss(binding.value)
  },
})

init()
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

bind(vm)