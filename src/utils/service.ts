import rootStore from '@/store'
import axios, { AxiosResponse } from 'axios'
import { encryptRSAWithAES } from './rsa'
import { getStorage } from './storage'
import { IApiCommonResp } from '@/api/types/response/common'
import ServiceError from './serviceError'
import { code } from './r/code'

const baseURL = import.meta.env.VITE_APP_BASEURL

const service = axios.create({
  baseURL,
})

const retryCheck = async (response: AxiosResponse<IApiCommonResp>): Promise<boolean> => {
  if (response.data.code === code.TOKEN_AUTHORIZATION_INVALID) {
    await rootStore.userStore.requestRefreshToken()
    return true
  }

  return false
}

const retry = (response: AxiosResponse<IApiCommonResp>) => {
  const delay = 2000

  return new Promise<AxiosResponse>((resolve) => {
    setTimeout(() => {
      resolve(service(response.config))
    }, delay)
  })
}

// 请求拦截器
service.interceptors.request.use(async (config) => {
  const token = getStorage("token")
  // 携带cookie
  config.withCredentials = config.withCredentials ?? true
  // 携带token
  config.withToken = config.withToken ?? true 

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

  // withToken 为 true 并且有 token，请求加上Authorization头
  if (config.withToken && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

service.interceptors.response.use(async (response: AxiosResponse<IApiCommonResp>) => {

  if (await retryCheck(response)) {
    return retry(response)
  }

  if (response.data.code !== 0) {
    return Promise.reject(new ServiceError(response))
  }

  return Promise.resolve(response)
})

export default service
