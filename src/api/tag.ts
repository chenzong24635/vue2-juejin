import request from './index'
//标签 列表文章
const tags = (tagId:string = '', page:number = 1, pageSize:number = 20, sort:string = 'rankIndex') => {
  return request({
    method: 'GET',
    url: '/v1/get_tag_entry',
    params: {
      src: 'web',
      tagId,
      page,
      pageSize,
      sort,
    }
  })
}
//标签 头部信息
const tagDetail = (tagName:string) => {
  return request({
    method: 'GET',
    url: `/v1/tag/${tagName}`,
  })
}
//全部标签
const subscribe = (type:string, page:number, pageSize:number) => {
  return request({
    method: 'GET',
    url: `/v1/tags/type/${type}/page/${page}/pageSize/${pageSize}`,
  })
}
//全部标签搜索
const subscribeSearch = (type:string, keyword:string, page:number, pageSize:number) => {
  return request({
    method: 'GET',
    url: `/v1/tag/type/${type}/search/${keyword}/page/${page}/pageSize/${pageSize}`,
  })
}


export default {
  tags,
  tagDetail,
  subscribe,
  subscribeSearch
}