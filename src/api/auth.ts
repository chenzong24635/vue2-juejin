// 登录注册
import request from './index'

const login = (phoneNumber: number | string, password: string) => {
  return request({
    method: 'POST',
    url: '/auth/type/phoneNumber',
    data: {
      phoneNumber,
      password
    }
  })
}
export default{
  login
}