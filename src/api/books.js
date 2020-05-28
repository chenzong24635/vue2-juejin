import request from './index'

// https://xiaoce-timeline-api-ms.juejin.im/v1/getNavList
const navList = () => {
  return request({
    method: 'GET',
    url: '/v1/getNavList'
  })
}

const lists = (alias = '', pageNum = 1) => {
  return request({
    method: 'GET',
    url: '/v1/getListByLastTime',
    params: {
      uid: '',
      client_id: '',
      token: '',
      src: 'web',
      alias,
      pageNum
    }
  })
}

//小册头部信息,介绍
const bookDesc = (id) => {
  return request({
    method: 'GET',
    url: '/v1/get',
    params: {
      uid: '',
      client_id: '',
      token: '',
      src: 'web',
      id
    }
  })
}
//小册目录
const bookSection = (id) => {
  return request({
    method: 'GET',
    url: '/v1/getListSection',
    params: {
      uid: '',
      client_id: '',
      token: '',
      src: 'web',
      id
    }
  })
}

export default{
  navList,
  lists,
  bookDesc,
  bookSection
}