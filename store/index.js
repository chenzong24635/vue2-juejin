export const state = () => ({
  isLogin: false,
  homeApiData: {},
  path: ''
})
export const mutations = () => ({
  setHomeApiData(state, obj) {
    let {path, homeApiData} = obj;
    state.path = path;
    console.log(obj,state.path);
    state.homeApiData = homeApiData;
  }
})
