import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginModel: ''
  },
  mutations: {
    //显示隐藏 登录注册框
    setLoginModel(state, val) {
      state.loginModel = val
    },
  },
  actions: {
    //点赞，评论操作时判断是否登录，否显示登录框
    showLoginModel({state}){
      return new Promise((resolve) => {
        if(!state.isLogin) {
          state.loginModel = 'login'
          return resolve(false)
        }
        return resolve(true)
      })
      
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
