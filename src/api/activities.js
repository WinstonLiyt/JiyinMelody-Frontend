/**
 * 将获取 token 和创建 headers 的逻辑提取为一个辅助函数，减少重复代码。
 */

import request from "./config";

/**
 * Helper function to get authentication headers
 * @returns {Object} - Headers object with Authorization token
 * @throws {Error} - If token is not found in localStorage
 */
function getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }
    return {
        Authorization: `Token ${token}`,
    };
}

/**
 * Create a new activity
 * @param {Object} data - The data for the new activity
 * @returns {Promise} - Axios request promise
 */
export function createActivity(data) {
    const headers = getAuthHeaders();
    return request({
        url: "/activity/create/",
        method: "post",
        data: data,
        headers: headers,
    });
}

/**
 * Get the list of activities
 * @returns {Promise} - Axios request promise
 */
export function getActivities() {
    const headers = getAuthHeaders();
    return request({
        url: "/activity/list/",
        method: "post",
        headers: headers,
    });
}

/**
 * Create a new work
 * @param {Object} data - The data for the new work
 * @returns {Promise} - Axios request promise
 */
export function createWork(data) {
    const headers = getAuthHeaders();
    console.log(data);
    return request({
        url: "/blog/work/create/",
        method: "post",
        data: data,
        headers: headers,
    });
}

/**
 * Get the list of works for an activity
 * @param {Object} data - The data for querying works
 * @returns {Promise} - Axios request promise
 */
export function getActivityworks(data) {
    const headers = getAuthHeaders();
    return request({
        url: "/blog/work/list/",
        method: "post",
        data: data,
        headers: headers,
    });
}