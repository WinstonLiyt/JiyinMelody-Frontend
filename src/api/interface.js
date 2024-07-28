import request from './config'

export function searchfriendchats(data) {//查询好友聊天记录
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
    url: '/interact/chat/list_friend/',
    method: 'post',
    headers: headers,
    data: data,
  })
}

export function searchgroupchats(data) {//查询群组聊天记录
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
    url: '/interact/chat/list_group/',
    method: 'post',
    headers: headers,
    data: data,
  })
}
export function searchnotices() {//查询通知
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
    url: '/notice/list_normal/',
    method: 'post',
    headers: headers,
  })
}

export function sendfriendchats(data) {//send好友聊天记录
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
    url: '/interact/chat/send_friend/',
    method: 'post',
    headers: headers,
    data
  })
}

export function sendgroupchats(data) {//send好友聊天记录
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
    url: '/interact/chat/send_group/',
    method: 'post',
    headers: headers,
    data
  })
}

export function searchinvitations() {//查询邀请
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
    url: '/interact/invitation/list/',
    method: 'post',
    headers: headers
  })
}

export function backinvitations(data) {//回复邀请
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
    url: '/interact/invitation/reply/',
    method: 'post',
    headers: headers,
    data: data
  })
}


