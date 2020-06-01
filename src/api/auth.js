// 登录注册
import request from './index'

const loginAuth = (phoneNumber, password) => {
  // let data = `phoneNumber=${phoneNumber}&password=${password}`
  // return request.post('/auth/type/phoneNumber',data, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })
  return request({
    method: 'POST',
    url: '/auth/type/phoneNumber',
    data: {
      phoneNumber,
      password
    }
  })
}
const login = (
  username,
  password,
  loginType='tel',
) => {
  console.log('login')
  let data = `user=${username}&psd=${password}&src=android&login_type=${loginType}&client_id=''&device_id=''&state=state&token=''`
  return request.post('/auth-center/v1/login',data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
}

export default{
  loginAuth,
  login
}