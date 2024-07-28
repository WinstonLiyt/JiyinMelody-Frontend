import request from './config'


export function getNoticeGlobal() {
  //获取特定的群组信息

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
     url: '/notice/list_global/',
     method: 'post',
     headers: headers
   })
}



export function createNoticeGlobal(data) {
  //获取特定的群组信息

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
     url: '/notice/create/',
     method: 'post',
     data: data,
     headers: headers
   })
}



export function getMusicApplication() {
  //获取特定的群组信息

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
     url: '/permission/musician/list/',
     method: 'post',
     headers: headers
   })
}



export function reviewMusicApplication(data) {
    //获取特定的群组信息

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
       url: '/permission/musician/review/',
       method: 'post',
       data: data,
       headers: headers
     })
}  


export function updateAdmin(data) {
  //获取特定的群组信息

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
     url: '/permission/admin/update/',
     method: 'post',
     data: data,
     headers: headers
   })
}  




