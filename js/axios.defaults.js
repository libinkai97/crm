
// axios.defaults.baseURL = "http://localhost:8888";

axios.defaults.baseURL = "http://127.0.0.1:8888";

axios.defaults.withCredentials = true;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}

axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
    return response.data;
}, reason => {
    // console.log(reason)
    if (reason.response) {
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求的地址不存在！")
                break;
            default:
                break;
        }
    }

    return Promise.reject(reason);
})

axios.defaults.validateStatus = function (status) {
    return /^(2|3)\d{2}$/.test(status);
}