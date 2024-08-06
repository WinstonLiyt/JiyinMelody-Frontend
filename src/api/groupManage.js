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
 * Get specific group information
 * @param {Object} data - The data for querying group information
 * @returns {Promise} - Axios request promise
 */
export function getGroupInfo(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/query/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Get list of all friends
 * @returns {Promise} - Axios request promise
 */
export function getAllFriend() {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/friend/list/',
    method: 'post',
    headers: headers
  });
}

/**
 * Update group information
 * @param {Object} data - The data for updating group information
 * @returns {Promise} - Axios request promise
 */
export function UpdateGroupInfo(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/update/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Add a user to a group
 * @param {Object} data - The data for adding a user to the group
 * @returns {Promise} - Axios request promise
 */
export function AddGroupUser(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/interact/invitation/invite_group/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Delete a user from a group
 * @param {Object} data - The data for deleting a user from the group
 * @returns {Promise} - Axios request promise
 */
export function DeleteGroupUser(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/remove/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Dissolve a group
 * @param {Object} data - The data for dissolving the group
 * @returns {Promise} - Axios request promise
 */
export function DeleteGroup(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/dissolve/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Exit a group
 * @param {Object} data - The data for exiting the group
 * @returns {Promise} - Axios request promise
 */
export function ExitGroup(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/quit/',
    method: 'post',
    data: data,
    headers: headers
  });
}

/**
 * Upload a file
 * @param {Object} data - The data for uploading the file
 * @returns {Promise} - Axios request promise
 */
export function upload(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error('Token not found');
  }
  
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("category", data.category);
  formData.append("usage", data.usage);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

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
  });
}

/**
 * Create a group
 * @param {Object} data - The data for creating a group
 * @returns {Promise} - Axios request promise
 */
export function createGroup(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/relation/group/create/',
    method: 'post',
    headers: headers,
    data: data,
  });
}
