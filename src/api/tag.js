import request from './index'

const lists = (tagId = '', page = 1, pageSize = 20, sort = 'rankIndex') => {
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
export default{
  lists
}