import request from './config'


export function getfriends() {//获取好友列表
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

export function getgroups() {//获取小组列表
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
    url: '/relation/group/list/',
    method: 'post',
    headers: headers
  })
}


export function sendmessage(data) {//发送消息
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
    url: '/interact/chat/send_friend/',
    method: 'post',
    headers: headers,
    data: data
  })
}

export function delet(data) {//删除好友
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
    url: '/relation/friend/delete/',
    method: 'post',
    data: data,
    headers: headers
  })
}

export function add_fri(data) {//增加好友
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
    url: '/interact/invitation/invite_friend/',
    method: 'post',
    data: data,
    headers: headers
  })
}

export function getmedal() {//获取小组列表
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
    url: '/relation/group/list/',
    method: 'post',
    headers: headers
  })
}

