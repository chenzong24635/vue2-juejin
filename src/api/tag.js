import request from './index'

const tags = (tagId = '', page = 1, pageSize = 20, sort = 'rankIndex') => {
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
// https://gold-tag-ms.juejin.im/v1/tags/type/new/page/2/pageSize/40
// https://gold-tag-ms.juejin.im/v1/tags/type/hot/page/1/pageSize/40
// https://gold-tag-ms.juejin.im/v1/tag/type/hot/search/%E7%AB%AF/page/1/pageSize/40
const subscribe = (page = 1, pageSize = 40, type = 'new') => {
  return request({
    method: 'GET',
    url: `/v1/tags/type/${type}/page/${page}/pageSize/${pageSize}`,
  })
}


export default {
  tags,
  subscribe
}