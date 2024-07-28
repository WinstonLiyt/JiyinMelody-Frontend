import request from './config'


export function getGroupInfo(data) {
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
       url: '/relation/group/query/',
       method: 'post',
       data: data,
       headers: headers
     })
}  


export function getAllFriend() {
    //当前用户的所有朋友

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
       url: '/relation/friend/list/',
       method: 'post',
       headers: headers
     })
}  


export function UpdateGroupInfo(data) {
    //当前用户的所有朋友

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
       url: '/relation/group/update/',
       method: 'post',
       data: data,
       headers: headers
     })
}  




export function AddGroupUser(data) {
    //当前用户的所有朋友

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
       url: '/interact/invitation/invite_group/',
       method: 'post',
       data: data,
       headers: headers
     })
} 



export function DeleteGroupUser(data) {
  //当前用户的所有朋友

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
     url: '/relation/group/remove/',
     method: 'post',
     data: data,
     headers: headers
   })
}  

//解散群组
export function DeleteGroup(data) {
    //当前用户的所有朋友

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
       url: '/relation/group/dissolve/',
       method: 'post',
       data: data,
       headers: headers
     })
}  



//退出群组
export function ExitGroup(data) {
    //当前用户的所有朋友

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
       url: '/relation/group/quit/',
       method: 'post',
       data: data,
       headers: headers
     })
}  



   
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

export function create_group(data) {
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
    url: '/relation/group/create/',
    method: 'post',
    headers: headers,
    data: data,
  })
}










