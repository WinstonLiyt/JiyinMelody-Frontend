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
 * Search friend chat records
 * @param {Object} data - The data for querying friend chat records
 * @returns {Promise} - Axios request promise
 */
export function searchfriendchats(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/chat/list_friend/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Search group chat records
 * @param {Object} data - The data for querying group chat records
 * @returns {Promise} - Axios request promise
 */
export function searchgroupchats(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/chat/list_group/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Search notices
 * @returns {Promise} - Axios request promise
 */
export function searchnotices() {
  const headers = getAuthHeaders();
  return request({
    url: '/notice/list_normal/',
    method: 'post',
    headers: headers
  });
}

/**
 * Send friend chat message
 * @param {Object} data - The data for sending friend chat message
 * @returns {Promise} - Axios request promise
 */
export function sendfriendchats(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/chat/send_friend/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Send group chat message
 * @param {Object} data - The data for sending group chat message
 * @returns {Promise} - Axios request promise
 */
export function sendgroupchats(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/chat/send_group/',
    method: 'post',
    headers: headers,
    data: data
  });
}

/**
 * Search invitations
 * @returns {Promise} - Axios request promise
 */
export function searchinvitations() {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/invitation/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Reply to invitations
 * @param {Object} data - The data for replying to invitations
 * @returns {Promise} - Axios request promise
 */
export function backinvitations(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/invitation/reply/',
    method: 'post',
    headers: headers,
    data: data
  });
}
