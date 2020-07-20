// 话题
import request from './index'

// 列表
const lists = (topicId, sortType = 'rank', page = 0, pageSize = 20) => {
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
      sortType
    }
  })
}

// 话题信息
// https://short-msg-ms.juejin.im/v1/topic/5abb61e1092dcb4620ca3322?uid=&device_id=&token=&src=web
const topicDetail = (topicId) => {
  return request({
    method: 'GET',
    url: `/v1/topic/${topicId}`,
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
    }
  })
}
// 参加人
const attenders = (topicId, page = 0, pageSize = 20) => {
  return request({
    method: 'GET',
    url: '/v1/topic/attenders',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      topicId,
      page,
      pageSize
    }
  })
}

export default{
  lists,
  topicDetail,
  attenders
}