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
 * Search for posts
 * @param {Object} data - The data for querying posts
 * @returns {Promise} - Axios request promise
 */
export function search(data) {
  const headers = getAuthHeaders();
  return request({
    url: '/utils/search/',
    method: 'post',
    headers: headers,
    data: data
  });
}