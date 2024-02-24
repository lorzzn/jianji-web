import { apiApp } from "@/api/app";
import errorHandler from "@/utils/errorHandler";
import { makeAutoObservable } from "mobx";


class AppStore {
  constructor() {
    makeAutoObservable(this)
    this.getAppInfo()
  }

  serverTime: number = Date.now()
  publicKey: string|null = null

  getAppInfo = async () => {
    try {
      const res = await apiApp.getAppInfo()
      this.serverTime = res.data.data.time / 1e6
    } catch (error) {
      errorHandler.handle(error)
    }
  }

  getPublicKey = async (): Promise<string|null> => {
    if (!this.publicKey) {
      await this.updatePublicKey()
      return this.publicKey
    }
    return this.publicKey
  }

  updatePublicKey = async () => {
    try {
      const res = await apiApp.getPublicKey()
      this.publicKey = res.data.data.publicKey
    } catch (error) {
      errorHandler.handle(error)
    }    
  }
}

export default AppStore
