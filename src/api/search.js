
import request from './config'

export function search(data) {//查询帖子
    // 从localStorage中读取token
  const token = localStorage.getItem("token");

  // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
  if (!token) {
    throw new Error('Token not found');
  }
  // 将token添加到headers对象中
  const headers = {
   'Authorization': `Token ${token}`
 };
   return request({
     url: '/utils/search/',
     method: 'post',
     headers: headers,
     data: data,
   })
 }