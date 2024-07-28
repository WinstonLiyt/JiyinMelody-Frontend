import { formToJSON } from 'axios';
import request from './config'

export function upload(data) {//上传文件
    // 从localStorage中读取token
  const token = localStorage.getItem("token");

  // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
  if (!token) {
    throw new Error('Token not found');
  }
  const formData = new FormData();

  formData.append("file",data.file);
  formData.append("category",data.category);
  formData.append("usage",data.usage);
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  // 将token添加到headers对象中
  const headers = {
   'Authorization': `Token ${token}`
 };
   return request({
     url: '/utils/upload/',
     method: 'post',
     headers: headers,
     data: formData,
     contentType: false,
     processData: false,
   })
 }

 export function  updateUserInfo(data){
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
  url: '/account/update_info/',
  method: 'post',
  data: data,
  headers: headers,
  })
}

export function applymusic(data) {
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

  // 调用API并处理响应
  return request({
  url: '/permission/musician/apply/',
  method: 'post',
  data: data,
  headers: headers
  });
}