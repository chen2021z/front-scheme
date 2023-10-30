import axios from "axios";

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '300B3A2AFB04EAD7'
    // if (store.getters.token) {
    //   // 如果token存在 注入token
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    // }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service