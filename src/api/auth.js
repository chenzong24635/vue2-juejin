// 登录注册
import request from './index'

//全部话题
export const loginAuth = (phoneNumber, password) => {
  return request({
    method: 'POST',
    url: '/auth/type/phoneNumber',
    params: {
      phoneNumber,
      password
    }
  })

}
// https://juejin.im/auth/type/phoneNumber