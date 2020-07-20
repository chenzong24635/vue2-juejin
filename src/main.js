import { createApp,createComponent } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './icons/index.js'
import componentsInstall from '@/libs/componentsInstall.js'

// import filters from '@/filters'
// import '@/components/loading/index.js'

// import utils from '@/libs/util.js'
// import Alert from '@/components/common/alert/alert.js'
// Vue.prototype.$Alert = Alert
// Vue.prototype.$utils = utils;

createApp(App).use(router).use(store).use(componentsInstall).use(icons).mount('#app')
