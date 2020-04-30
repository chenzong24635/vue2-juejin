import request from './index'
//活动

//城市
// https://event-storage-api-ms.juejin.im/v1/getCityList?uid=&client_id=&token=&src=web
const cityList = () => {
  return request({
    method: 'GET',
    url: '/v1/getCityList',
    params: { 
      uid: '',
      client_id: '',
      token: '',
      src: 'web'
    }
  })
}

//banner
// https://event-storage-api-ms.juejin.im/v1/getEventList
const banner = () => {
  let bannerStartTime = new Date().toISOString();
  return request({
    method: 'GET',
    url: '/v1/getEventList',
    params: { 
      uid: '',
      client_id: '',
      token: '',
      src: 'web',
      orderType: 'startTime',
      bannerStartTime,
      pageNum: 1,
      pageSize: 20,
      showBanner: 1,
    }
  })
}

const eventList = (cityAlias = '') => {
  return request({
    method: 'GET',
    url: '/v1/getEventList',
    params: { 
      uid: '',
      client_id: '',
      token: '',
      src: 'web',
      orderType: 'startTime',
      cityAlias,
      pageNum: 1,
      pageSize: 20,
      showBanner: 1,
    }
  })
}

export default {
  cityList,
  banner,
  eventList
}