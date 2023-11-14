import axios from "axios";
import store from "../store";
const service = axios.create({
  // 根据项目状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '300B3A2AFB04EAD7'
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)


/**
 * 响应拦截器，响应数据之后，then之前被调用
 */
service.interceptors.response.use((response)=>{
  const {success, message, data} = response.data
  if(success){
    return data
  }

  return Promise.reject(new Error(message))
})
export default service