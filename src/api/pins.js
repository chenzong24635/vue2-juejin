import request from './index'

// 推荐，热门，关注
const lists1 = (data) => {
  return request({
    method: 'POST',
    url: 'https://web-api.juejin.im/query',
    data
  })
}

//开源推荐...
const lists2 = (topicId, page = 0, pageSize = 20) => {
  return request({
    method: 'GET',
    url: '/v1/pinList/topic',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      topicId,
      page,
      pageSize,
      sortType: 'rank'
    } 
  })
}

// 推荐沸点
const hotLists = () => {
  return request({
    method: 'GET',
    url: '/v1/getHotRecommendList',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
    } 
  })
}

export default{
  lists1,
  lists2,
  hotLists
}