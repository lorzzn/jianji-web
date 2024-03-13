import { apiApp } from "@/api/app";
import { ILocation } from "@/api/types/response/app";
import errorHandler from "@/utils/errorHandler";
import { getFingerprint } from "@/utils/fingerprint";
import { makeAutoObservable } from "mobx";

class AppStore {

  publicKey: string|null = null
  serverTime: number = 0
  serverTimeLastUpdate: number = 0
  sessionId: string = ""
  location: ILocation = { country: "", city: "" }
  fingerprint: string = ""

  constructor() {
    makeAutoObservable(this)
    this.fingerprint = getFingerprint()
    this.getAppConfig()
  }

  // 获取应用信息（运行配置...）
  getAppConfig = async () => {
    try {
      const res = await apiApp.getAppConfig()
      this.serverTime = res.data.data.time
      this.serverTimeLastUpdate = Date.now()
      this.location = res.data.data.location
      this.sessionId = res.data.data.sessionId
    } catch (error) {
      errorHandler.handle(error)
    }
  }

  getCurrentServerTime = () => {
    return this.serverTime + Date.now() - this.serverTimeLastUpdate
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
      const res = await apiApp.getPublicKey()
      this.publicKey = res.data.data.publicKey
    } catch (error) {
      this.publicKey = null
      errorHandler.handle(error)
    }
  }
}

export default AppStore
