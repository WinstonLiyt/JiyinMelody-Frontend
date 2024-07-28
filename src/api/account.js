import request from './config'

export function login(data) {//登录
    return request({
      url: '/account/login/',
      method: 'post',
      data: data,
    })
  }

export function getinfo() {//获取用户信息
   // 从localStorage中读取token
   const token = localStorage.getItem("token");

   // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
   if (!token) {
     throw new Error('Token not found');
   }

   const headers = {
    'Authorization': `Token ${token}`
  };

    return request({
      url: '/account/me/',
      method: 'post',
      headers: headers
    })
}

export function verify(data) {//请求验证码
    return request({
      url: '/account/verify/',
      method: 'post',
      data: data
    })
  }  

export function register(data) {//注册
    return request({
      url: '/account/register/',
      method: 'post',
      data: data
    })
  }

export function findpass(data) {//找回密码
    return request({
      url: '/account/update_password/',
      method: 'post',
      data: data
    })
  }

  export function getinfo_other(data) {//获取用户信息
    // 从localStorage中读取token
    const token = localStorage.getItem("token");
  
    // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = {
     'Authorization': `Token ${token}`
   };
  
     return request({
       url: '/account/query/',
       method: 'post',
       data:data,
       headers: headers
     })
  }
  
  export function getInfoById() {
    // 从localStorage中读取token
    const token = localStorage.getItem("token");
  
    // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = {
      'Authorization': `Token ${token}`
    };
  
    // 发送GET请求到指定的接口，比如 '/account/users/{userId}/'
    return request({
      url: `/account/me/`, // 使用模板字符串插入userId
      method: 'POST',
      headers: headers
    })
  }
  
  export function getfri() {//获取好友
    // 从localStorage中读取token
    const token = localStorage.getItem("token");
  
    // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = {
     'Authorization': `Token ${token}`
   };
  
     return request({
       url: '/relation/friend/list/',
       method: 'post',
       headers: headers
     })
  }
  
  export function getotherinfo(data) {//获取其他用户信息
      // 从localStorage中读取token
      const token = localStorage.getItem("token");
    
      // 检查token是否存在，如果不存在，可以抛出一个错误或者返回一个Promise.reject()
      if (!token) {
        throw new Error('Token not found');
      }
    
      const headers = {
       'Authorization': `Token ${token}`
     };
    
       return request({
         url: '/account/me/',
         method: 'post',
         headers: headers,
         data: data
    })
    }