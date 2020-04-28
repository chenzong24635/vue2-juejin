import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    homeApiData: {},
    path: ''
  },
  mutations: {
    setHomeApiData(state, obj) {
      let {path, homeApiData} = obj;
      state.path = path;
      console.log(obj,state.path);
      state.homeApiData = homeApiData;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
