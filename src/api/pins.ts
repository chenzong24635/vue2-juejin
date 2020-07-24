import request from './index'

interface objType{
  [p:string]: any
}

// 推荐，热门，关注
const lists1 = (data: objType) => {
  return request({
    method: 'POST',
    url: 'https://web-api.juejin.im/query',
    data
  })
}

//开源推荐...
const lists2 = (topicId: string, page: number = 0, pageSize: number = 20) => {
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
const pinComments = (id: string, pageNum: number = 1, pageSize: number = 20) => {
  return request({
    method: 'GET',
    url: `/v1/comments/${id}`,
    params: {
      pageNum,
      pageSize
    } 
  })
}
const pinDetail = (msgId: string) => {
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
// https://comment-wrapper-ms.juejin.im?pageNum=1&pageSize=10
const pinReply  = (targetId: string, id: string, pageNum: number = 1, pageSize: number = 10) => {
  return request({
    method: 'GET',
    url: `/v1/comments/entry/${targetId}/comment/${id}`,
    params: {
      pageNum,
      pageSize
    } 
  })
}
// const pinReply  = (id: string, pageNum: number = 1, pageSize: number = 10) => {
//   return request({
//     method: 'GET',
//     url: `/v1/reply/${id}`,
//     params: {
//       pageNum,
//       pageSize
//     } 
//   })
// }

export default{
  lists1,
  lists2,
  hotLists,
  pinComments,
  pinDetail,
  pinReply,
}