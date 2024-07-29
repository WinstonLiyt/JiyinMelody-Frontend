/**
 * 将获取 token 和创建 headers 的逻辑提取为一个辅助函数 getAuthHeaders
 */

import request from './config'

// Helper function to get token from localStorage and create headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error('Token not found'));
  }
  return {
    'Authorization': `Token ${token}`
  };
}

/**
 * Log in a user.
 * @param {Object} data - The login data.
 * @returns {Promise} - The Axios request promise.
 */
export function login(data) {
  return request({
    url: '/account/login/',
    method: 'post',
    data: data,
  });
}

/**
 * Get user information.
 * @returns {Promise} - The Axios request promise.
 */
export function getinfo() {
  const headers = getAuthHeaders();
  if (headers instanceof Promise) {
    return headers;
  }
  return request({
    url: '/account/me/',
    method: 'post',
    headers: headers
  });
}

/**
 * Request verification code.
 * @param {Object} data - The verification data.
 * @returns {Promise} - The Axios request promise.
 */
export function verify(data) {
  return request({
    url: '/account/verify/',
    method: 'post',
    data: data
  });
}

/**
 * Register a new user.
 * @param {Object} data - The registration data.
 * @returns {Promise} - The Axios request promise.
 */
export function register(data) {
  return request({
    url: '/account/register/',
    method: 'post',
    data: data
  });
}

/**
 * Find password.
 * @param {Object} data - The data to update the password.
 * @returns {Promise} - The Axios request promise.
 */
export function findpass(data) {
  return request({
    url: '/account/update_password/',
    method: 'post',
    data: data
  });
}

/**
 * Get information of another user.
 * @param {Object} data - The data for querying user information.
 * @returns {Promise} - The Axios request promise.
 */
export function getinfo_other(data) {
  const headers = getAuthHeaders();
  if (headers instanceof Promise) {
    return headers;
  }
  return request({
    url: '/account/query/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get information by user ID.
 * @returns {Promise} - The Axios request promise.
 */
export function getInfoById() {
  const headers = getAuthHeaders();
  if (headers instanceof Promise) {
    return headers;
  }
  return request({
    url: `/account/me/`,
    method: 'POST',
    headers: headers
  });
}

/**
 * Get friends list.
 * @returns {Promise} - The Axios request promise.
 */
export function getfri() {
  const headers = getAuthHeaders();
  if (headers instanceof Promise) {
    return headers;
  }
  return request({
    url: '/relation/friend/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Get information of other users.
 * @param {Object} data - The data for querying other users' information.
 * @returns {Promise} - The Axios request promise.
 */
export function getotherinfo(data) {
  const headers = getAuthHeaders();
  if (headers instanceof Promise) {
    return headers;
  }
  return request({
    url: '/account/me/',
    method: 'post',
    headers: headers,
    data: data
  });
}