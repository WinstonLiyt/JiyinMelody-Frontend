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
 * Get list of friends
 * @returns {Promise} - Axios request promise
 */
export function getfriends() {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/friend/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Get list of groups
 * @returns {Promise} - Axios request promise
 */
export function getgroups() {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Send a message to a friend
 * @param {Object} data - The data for sending a message
 * @returns {Promise} - Axios request promise
 */
export function sendmessage(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/chat/send_friend/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Delete a friend
 * @param {Object} data - The data for deleting a friend
 * @returns {Promise} - Axios request promise
 */
export function delet(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/friend/delete/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Add a friend
 * @param {Object} data - The data for adding a friend
 * @returns {Promise} - Axios request promise
 */
export function add_fri(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/invitation/invite_friend/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get list of medals (misnamed function, should correct endpoint)
 * @returns {Promise} - Axios request promise
 */
export function getmedal() {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/list/', // The endpoint seems incorrect for medals, should verify the correct endpoint
    method: 'post',
    headers: headers
  });
}