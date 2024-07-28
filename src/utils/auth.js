//存储cookie所用函数
import Cookies from 'js-cookie'


const userInfo = "userInfo"

//获取用户登录信息
export function getuserInfo() {
  const user = Cookies.get(userInfo)
  if(user){
    return JSON.parse(user)
  }
  return ''
}
//存储用户登录信息
export function setuserInfo(user) {
  return Cookies.set(userInfo, JSON.stringify(user))
}
//移除用户登录信息
export function removeuserInfo() {

  return Cookies.remove(userInfo)
}