import axios from 'axios'
// 请求拦截，设置的统一的请求头
axios.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }
    return config
})
export default axios