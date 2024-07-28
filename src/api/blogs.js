import request from './config'


export function getblogs() {//获取帖子列表
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
      url: '/blog/normal/list/',
      method: 'post',
      headers: headers
    })
  }

  export function gettopblogs() {//获取推荐帖子列表
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
     url: '/personal/list/recommend/',
     method: 'post',
     headers: headers
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

      export function createblog(data) {//修改收藏状态
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
           url: '/blog/normal/create/',
           method: 'post',
           data: data,
           headers: headers
         })
        }  
   

export function update_blog(data) {
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
    url: '/blog/detail/update/',
    method: 'post',
    data: data,
    headers: headers
  })
};

export function getcollect() {//获取所选帖子信息
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
     url: '/personal/list/collected/',
     method: 'post',
     headers: headers
   })
 }  
 
 export function deletblogs(data) {//删除好友
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
   url: '/blog/detail/delete/',
   method: 'post',
   data:data,
   headers: headers
 })
}

export function getownblog(data) {//获取所选帖子信息
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
     url: '/personal/list/published/',
     method: 'post',
     data:data,
     headers: headers
   })
 } 