import { apiApp } from "@/api/app";
import errorHandler from "@/utils/errorHandler";
import { makeAutoObservable } from "mobx";

class AppStore {

  publicKey: string|null = null
  serverTime: number = Date.now()

  constructor() {
    makeAutoObservable(this)
    this.getAppConfig()
  }

  // 获取应用信息（运行配置...）
  getAppConfig = async () => {
    try {
      const res = await apiApp.fetchAppConfig()
      this.serverTime = res.data.data.time / 1e6
    } catch (error) {
      errorHandler.handle(error)
    }
  }

  // 获取 RSA publicKey
  getPublicKey = async (forceUpdate: boolean = true): Promise<string|null> => {
    if (!this.publicKey || forceUpdate) {
      await this.updatePublicKey()
      return this.publicKey
    }
    return this.publicKey
  }

  // 从后端获取 publicKey
  updatePublicKey = async () => {
    try {
      const res = await apiApp.fetchPublicKey()
      this.publicKey = res.data.data.publicKey
    } catch (error) {
      this.publicKey = null
      errorHandler.handle(error)
    }
  }
}

export default AppStore
