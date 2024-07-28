import request from './config'


export function getcomments(data) {//获取帖子评论
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
      url: '/comment/list/',
      method: 'post',
      headers: headers,
      data: data
    })
  }


export function submitcomments(data) {//发布评论
  console.log(data)
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
    url: '/comment/submit/',
    method: 'post',
    headers: headers,
    data: data
  })
}

export function deletecomments(data) {//删除评论
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
    url: '/comment/delete/',
    method: 'post',
    headers: headers,
    data: data
  })
}



  export function gettags() {//获取标签列表
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
     url: '/utils/list_tag/',
     method: 'post',
     headers: headers
   })
 }

export function gettheblog(data) {//获取所选帖子信息
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
      url: '/blog/detail/query/',
      method: 'post',
      data: data,
      headers: headers
    })
  }  

export function set_like(data) {//修改点赞状态
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
       url: '/blog/detail/set_like/',
       method: 'post',
       data: data,
       headers: headers
     })
    }  
 
    export function set_collect(data) {//修改收藏状态
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
         url: '/blog/detail/set_collect/',
         method: 'post',
         data: data,
         headers: headers
       })
      }  
   
export function register(data) {//注册
    return request({
      url: '/account/register/',
      method: 'post',
      data
    })
  }

export function findpass(data) {//找回密码
    return request({
      url: '/account/update_password/',
      method: 'post',
      data
    })
  }