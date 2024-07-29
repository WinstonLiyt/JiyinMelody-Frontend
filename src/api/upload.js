import { formToJSON } from 'axios';
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
 * Upload a file
 * @param {Object} data - The data for uploading the file
 * @returns {Promise} - Axios request promise
 */
export function upload(data) {
  const headers = getAuthHeaders();
  
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("category", data.category);
  formData.append("usage", data.usage);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

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
 * Update user information
 * @param {Object} data - The data for updating user information
 * @returns {Promise} - Axios request promise
 */
export function updateUserInfo(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/account/update_info/',
    method: 'post',
    data: data,
    headers: headers,
  });
}

/**
 * Apply for musician permission
 * @param {Object} data - The data for applying musician permission
 * @returns {Promise} - Axios request promise
 */
export function applymusic(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/permission/musician/apply/',
    method: 'post',
    data: data,
    headers: headers
  });
}
