// TODO 这里的部分函数命名有问题

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
 * Get list of comments for a blog post
 * @param {Object} data - The data for querying comments
 * @returns {Promise} - Axios request promise
 */
export function getcomments(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/comment/list/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Submit a new comment
 * @param {Object} data - The data for submitting a comment
 * @returns {Promise} - Axios request promise
 */
export function submitcomments(data) {
  const headers = getAuthHeaders();
  console.log(data);
  return request({
    url: '/comment/submit/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Delete a comment
 * @param {Object} data - The data for deleting a comment
 * @returns {Promise} - Axios request promise
 */
export function deletecomments(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/comment/delete/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Get list of tags
 * @returns {Promise} - Axios request promise
 */
export function getTags() {
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
 * Register a new user
 * @param {Object} data - The registration data
 * @returns {Promise} - Axios request promise
 */
export function register(data) {
  return request({
    url: '/account/register/',
    method: 'post',
    data: data
  });
}

/**
 * Find password
 * @param {Object} data - The data to update the password
 * @returns {Promise} - Axios request promise
 */
export function findpass(data) {
  return request({
    url: '/account/update_password/',
    method: 'post',
    data: data
  });
}