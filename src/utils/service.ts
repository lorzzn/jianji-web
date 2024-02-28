import rootStore from '@/store'
import axios, { AxiosResponse } from 'axios'
import { encryptRSAWithAES } from './rsa'
import { getStorage } from './storage'
import { IApiCommonResp } from '@/api/types/response/common'
import ServiceError from './serviceError'

const baseURL = import.meta.env.VITE_APP_BASEURL

const service = axios.create({
  baseURL,
})

// 请求拦截器
service.interceptors.request.use(async (config) => {
  const token = getStorage("token")
  config.withCredentials = config.withCredentials ?? true

  if (config.encrypt) {
     // 标识请求为加密请求
    config.headers.Encrypted = true

    // 获取rsa publicKey， 对请求参数进行加密
    const publicKey = await rootStore.appStore.getPublicKey(true)

    // 没有 publicKey 返回错误
    if (!publicKey) {
      return Promise.reject(new axios.Cancel('公钥获取失败'));
    }

    config.data = encryptRSAWithAES(config.data, publicKey)
  }

  // withCredentials 为 true 并且有 token，请求加上Authorization头
  if (config.withCredentials && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


service.interceptors.response.use((response: AxiosResponse<IApiCommonResp>) => {

  if (response.data.code !== 0) {
    return Promise.reject(new ServiceError(response.data.message))
  }
  
  return Promise.resolve(response)
})

export default service
