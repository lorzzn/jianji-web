import { IEditProfileReq } from "@/api/types/request/user";
import { IUserInfo } from "@/api/types/response/user";
import { apiUser } from "@/api/user";
import errorHandler from "@/utils/errorHandler";
import eventBus, { events } from "@/utils/eventBus";
import { code } from "@/utils/r/code";
import { getStorage, removeStroage, setStorage } from "@/utils/storage";
import { makeAutoObservable } from "mobx";

class UserStore {

  loading = false
  initialUserInfo: IUserInfo= {
    id: 0,
    uuid: "",
    createdAt: "",
    updatedAt: "",
    name: "",
    avatar: "",
    email: "",
  }
  userInfo: IUserInfo= { ...this.initialUserInfo }
  token: string|null = null
  refreshToken: string|null = null

  constructor() {
    makeAutoObservable(this)

    this.token = getStorage("token")
    this.refreshToken = getStorage("refreshToken")
    this.loading = true

    this.requestRefreshToken().then(async () => {
      await this.fetchProfile()
      this.setLoading(false)
    }).catch(() => {
      this.setLoading(false)
    })
  }

  setLoading = (loading: boolean) => this.loading = loading

  setUserInfo = (data: IUserInfo) => {
    this.userInfo = data
  }

  // 保存token
  storeToken = (token: string, refreshToken: string) => {
    setStorage("token", token)
    setStorage("refreshToken", refreshToken)
  }

  // 清除token
  removeToken = () => {
    removeStroage("token")
    removeStroage("refreshToken")
  }

  resetUserInfo = () => {
    eventBus.emit(events.beforeResetUserInfo)
    this.setUserInfo({ ...this.initialUserInfo })
  }

  logout = async () => {
    try {
      const res = await apiUser.logout()
      eventBus.emit(events.afterUserLogout)
      this.removeToken()
      this.resetUserInfo()
      return Promise.resolve(res)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    }
  }

  // 刷新token
  requestRefreshToken = async () => {
    if (this.refreshToken && this.token) {
      try {
        const res = await apiUser.refreshToken({
          token: this.token,
          refreshToken: this.refreshToken
        })
        this.storeToken(res.data.data.token, res.data.data.refreshToken)
        return Promise.resolve(res)
      } catch (error) {
        errorHandler.handle(error)
        return Promise.reject(error)
      }
    }
    return Promise.reject("skip")
  }

  fetchProfile = async () => {
    if (this.token) {
      try {
        const res = await apiUser.profile()
        if (res.data.code === code.USER_NOT_LOGIN) {
          this.removeToken()
        } else {
          this.setUserInfo(res.data.data.userInfo)
        }
        return Promise.resolve(res)
      } catch (error) {
        errorHandler.handle(error)
        return Promise.reject(error)
      }
    }
  }

  editProfile = async (data: IEditProfileReq) => {
    try {
      const res = await apiUser.editProfile(data)
      this.setUserInfo(res.data.data.userInfo)
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

export default UserStore
