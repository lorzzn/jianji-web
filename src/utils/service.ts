import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASEURL

const service = axios.create({
  baseURL,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use((config) => {
  if (config.encrypt) {
    config.headers.Encrypted = true
  }
  return config
})


service.interceptors.response.use((response) => {
  
  return Promise.resolve(response)
})

export default service
