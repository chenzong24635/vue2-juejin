// 登录注册
import request from './index'

//
/* url: 'https://juejin.im/auth/type/phoneNumber',
    method: "POST",
    body: {
      password: ctx.request.body.password,
      phoneNumber: ctx.request.body.phoneNumber
    } */
export const loginAuth = (phoneNumber, password) => {
  return request({
    method: 'POST',
    url: '/auth/type/phoneNumber',
    data: {
      phoneNumber,
      password
    }
  })
}
// https://juejin.im/auth/type/phoneNumber

// LOGIN
// c.REGISTER_WITH_PHONE;