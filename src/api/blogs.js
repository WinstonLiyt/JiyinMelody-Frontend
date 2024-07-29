/**
 * 提取重复代码，增加了辅助函数 getAuthHeaders，以减少重复代码并提高代码的可维护性和可读性。
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
 * Get list of blogs
 * @returns {Promise} - Axios request promise
 */
export function getblogs() {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/normal/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Get list of recommended blogs
 * @returns {Promise} - Axios request promise
 */
export function gettopblogs() {
  const headers = getAuthHeaders();
  return request({
    url: '/personal/list/recommend/',
    method: 'post',
    headers: headers
  });
}

/**
 * Get list of tags
 * @returns {Promise} - Axios request promise
 */
export function gettags() {
  const headers = getAuthHeaders();
  return request({
    url: '/utils/list_tag/',
    method: 'post',
    headers: headers
  });
}

/**
 * Get details of a selected blog
 * @param {Object} data - The data for querying the blog
 * @returns {Promise} - Axios request promise
 */
export function gettheblog(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/detail/query/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Set like status for a blog
 * @param {Object} data - The data for setting like status
 * @returns {Promise} - Axios request promise
 */
export function set_like(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/detail/set_like/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Set collect status for a blog
 * @param {Object} data - The data for setting collect status
 * @returns {Promise} - Axios request promise
 */
export function set_collect(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/detail/set_collect/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Create a new blog
 * @param {Object} data - The data for creating a blog
 * @returns {Promise} - Axios request promise
 */
export function createblog(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/normal/create/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Update a blog
 * @param {Object} data - The data for updating a blog
 * @returns {Promise} - Axios request promise
 */
export function update_blog(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/detail/update/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get list of collected blogs
 * @returns {Promise} - Axios request promise
 */
export function getcollect() {
  const headers = getAuthHeaders();
  return request({
    url: '/personal/list/collected/',
    method: 'post',
    headers: headers
  });
}

/**
 * Delete a blog
 * @param {Object} data - The data for deleting a blog
 * @returns {Promise} - Axios request promise
 */
export function deletblogs(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/blog/detail/delete/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get list of own blogs
 * @param {Object} data - The data for querying own blogs
 * @returns {Promise} - Axios request promise
 */
export function getownblog(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/personal/list/published/',
    method: 'post',
    data: data,
    headers: headers
  });
}