import request from './index'

// 用户信息
const author = (ids) => {
  return request({
    method: 'GET',
    url: '/v1/get_multi_user',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      ids,
      cols: ''
    }
  })
}

// 用户专栏
//https://timeline-merger-ms.juejin.im/v1/get_entry_by_self
const authorSection = (ownerId,after,size = 20) => {
  return request({
    method: 'POST',
    url: 'https://web-api.juejin.im/query',
    data: {
      operationName: "",
      query: "",
      variables: {
        ownerId,
        size,
        after
      },
      extensions: {
        query: {
          id: "b158d18c7ce74f0d6d85e73f21e17df6"
        }
      }
    }
  })
}
// const authorSection = (targetUid, before, order = 'createdAt', type = 'post', limit = 20) => {
//   return request({
//     method: 'GET',
//     url: '/v1/get_entry_by_self',
//     params: {
//       uid: '',
//       device_id: '',
//       token: '',
//       src: 'web',
//       targetUid,
//       before,
//       order
//       type,
//       limit,
//     }
//   })
// }

export default {
  author,
  authorSection
}