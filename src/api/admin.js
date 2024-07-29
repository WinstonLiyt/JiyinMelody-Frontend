/**
 * 使用辅助函数 getAuthHeaders 来统一获取 token 和创建 headers，避免重复代码。
 */

import request from './config'

/**
 * Helper function to get authentication headers
 * @returns {Object} - Headers object with Authorization token
 * @throws {Error} - If token is not found in localStorage
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error('Token not found');
  }
  return {
    'Authorization': `Token ${token}`
  };
}

/**
 * Get global notices
 * @returns {Promise} - Axios request promise
 */
export function getNoticeGlobal() {
  const headers = getAuthHeaders();
  return request({
    url: '/notice/list_global/',
    method: 'post',
    headers: headers
  });
}

/**
 * Create a global notice
 * @param {Object} data - The data for creating a notice
 * @returns {Promise} - Axios request promise
 */
export function createNoticeGlobal(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/notice/create/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get music applications
 * @returns {Promise} - Axios request promise
 */
export function getMusicApplication() {
  const headers = getAuthHeaders();
  return request({
    url: '/permission/musician/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Review music application
 * @param {Object} data - The data for reviewing a music application
 * @returns {Promise} - Axios request promise
 */
export function reviewMusicApplication(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/permission/musician/review/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Update admin information
 * @param {Object} data - The data for updating admin information
 * @returns {Promise} - Axios request promise
 */
export function updateAdmin(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/permission/admin/update/',
    method: 'post',
    data: data,
    headers: headers
  });
}