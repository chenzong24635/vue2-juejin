// 登录注册
import request from './index'

//
export const loginAuth = (phoneNumber, password) => {
  return request({
    method: 'POST',
    url: '/v1/auth/login',
    params: {
      phoneNumber,
      password
    }
  })
}
// https://juejin.im/auth/type/phoneNumber

// LOGIN
// c.REGISTER_WITH_PHONE;