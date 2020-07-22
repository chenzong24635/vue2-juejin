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

// 动态
const activities = (ownerId,after,size = 20) => {
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

// 专栏
const posts = (targetUid, order = 'createdAt', type = 'post', limit = 20) => {
  return request({
    method: 'GET',
    url: '/v1/get_entry_by_self',
    params: {
      targetUid,
      order,
      type,
      limit,
      src: 'web',
    }
  })
}
// 沸点 
const pins = (uid, before, limit = 20) => {
  return request({
    method: 'GET',
    url: '/v1/getUserList',
    params: {
      uid,
      before,
      limit,
      device_id: '',
      token:'',
      src: 'web',
    }
  })
}
// 分享 
const shares = (uid) => {
  return request({
    method: 'GET',
    url: '/v1/get_entry_by_self',
    params: {
      sub_location: uid + "-shares",
      location: 'user',
      suid: '7nZneiRfaJAQyUVvNnzB',
      src: 'juejin.im',
    }
  })
}

export default {
  author,
  activities,
  posts,
  pins,
  shares,
}