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

// 沸点评论
const pinComments = (id, pageNum = 1, pageSize = 20) => {
  return request({
    method: 'GET',
    url: `/v1/comments/${id}`,
    params: {
      pageNum,
      pageSize
    } 
  })
}
const pinDetail = (msgId) => {
  return request({
    method: 'GET',
    url: '/v1/getByID',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      msgId
    } 
  })
}

// 沸点评论的回复
const pinReply  = (id, pageNum = 1, pageSize = 10) => {
  return request({
    method: 'GET',
    url: `/v1/reply/${id}`,
    params: {
      pageNum,
      pageSize
    } 
  })
}

export default{
  lists1,
  lists2,
  hotLists,
  pinComments,
  pinDetail,
  pinReply,
}