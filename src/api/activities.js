import request from "./config";

export function createActivity(data) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        Authorization: `Token ${token}`,
    };

    return request({
        url: "/activity/create/",
        method: "post",
        data: data,
        headers: headers,
    });
}

export function getActivities() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        Authorization: `Token ${token}`,
    };

    return request({
        url: "/activity/list/",
        method: "post",
        headers: headers,
    });
}

export function createWork(data) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        Authorization: `Token ${token}`,
    };

    console.log(data);

    return request({
        url: "/blog/work/create/",
        method: "post",
        data: data,
        headers: headers,
    });
}

export function getActivityworks(data) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    const headers = {
        Authorization: `Token ${token}`,
    };

    return request({
        url: "/blog/work/list/",
        method: "post",
        data: data,
        headers: headers,
    });
}
