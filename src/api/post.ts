import request from './index'

/*  */

// https://post-storage-api-ms.juejin.im/v1/getDetailData?src&type=entryView&postId=5ea0049ae51d4546df73a46d

const article = (params) => {
  return request({
    method: 'GET',
    url: '/v1/getDetailData',
    params
  })
}

// 关于作者
const user = () => {
  return request({
    method: 'GET',
    url: '/v1/get_multi_user',
    params: {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      ids: '5b13f11d5188257da1245183',
      cols: ''
    }
  })
}


// 相关文章--侧边
const relatedEntry = (params) => {
  return request({
    method: 'GET',
    url: '/v1/get_related_entry',
    params
  })
}

//评论
const comments = (params) => {
  return request({
    method: 'GET',
    url: `/v1/comments/entry/${params.entryId}`,
    params
  })
}

//相关推荐--底部
const recommendEntry = (params) => {
  return request({
    method: 'GET',
    url: '/v1/getRecommendEntryByTagIds',
    params
  })
}

export default{
  article,
  user,
  relatedEntry,
  comments,
  recommendEntry,
}