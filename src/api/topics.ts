// 话题 api
import request from './index'

/* export const goodsList = (params) => axios.request({
  url: 'goods/search/goods',
  method: 'GET',
  params
});
 */

//全部话题
export const topicList = (uid:string = '', device_id:string = '') => {
  return request({
    method: 'GET',
    url: '/v1/topicList',
    params: {
      uid,
      device_id,
      token: '',
      src: 'web',
      sortType: 'hot',
      page: 0,
      pageSize: 100
    }
  })

}

//关注话题
export const topicListFollowed = (uid:string = '', device_id:string = '') => {
  return request({
    method: 'GET',
    url: '/v1/topicList/followed',
    params: {
      uid,
      device_id,
      token: '',
      src: 'web',
      after: 0,
      page: 0,
      pageSize: 100,
    }
  })
}

/* export const test = (data) => {
  return request.post('https://web-api.juejin.im/query', data, {

  })
}
test({
  operationName:"",
  query:"",
  variables:{
    type:"ALL",
    query:"vue3 onMounted",
    after:"",
    period:"ALL",
    first:20
  },
  extensions:{
    query:{
      "id":"a53db5867466eddc50d16a38cfeb0890"
    }
  }
}).then(res => {
  console.log(res);
}) */
