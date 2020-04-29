import request from './index'

// https://xiaoce-timeline-api-ms.juejin.im/v1/getNavList
const navList = () => {
  return request({
    method: 'GET',
    url: '/v1/getNavList'
  })
}

//https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=&client_id=&token=&src=web&alias=&pageNum=1

// https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime
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

export default{
  navList,
  lists
}