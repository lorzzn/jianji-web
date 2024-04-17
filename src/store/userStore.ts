import { IActiveRequest, IEditProfileRequest } from "@/api/types/request/user"
import { IUserInfo } from "@/api/types/response/user"
import { apiUser } from "@/api/user"
import errorHandler from "@/utils/errorHandler"
import eventBus, { events } from "@/utils/eventBus"
import { code } from "@/utils/r/code"
import { getStorage, removeStroage, setStorage } from "@/utils/storage"
import { autorun, makeAutoObservable } from "mobx"

const initialUserInfo: IUserInfo = {
  id: 0,
  uuid: "",
  createdAt: "",
  updatedAt: "",
  name: "",
  avatar: "",
  email: "",
  status: 0,
}

class UserStore {
  loading = true
  userInfo: IUserInfo = { ...initialUserInfo }

  constructor() {
    makeAutoObservable(this)

    eventBus.on(events.userAuthorizationExpired, this.resetAuthorization)
    this.setupAutorun()
    this.initStore()
  }

  private setupAutorun() {
    autorun(() => {
      if (!this.authed) {
        this.resetAuthorization()
      }
    })
  }

  initStore = () => {
    this.requestRefreshToken()
      .then(async () => {
        await this.getProfile()
        this.setLoading(false)
      })
      .catch(() => {
        this.setLoading(false)
      })
  }

  get token() {
    return getStorage("token")
  }

  get refreshToken() {
    return getStorage("refreshToken")
  }

  get authed(): boolean {
    if (this.loading) {
      return true
    }
    return Boolean(this.token && this.refreshToken && this.userInfo.id !== 0)
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setUserInfo = (data: IUserInfo) => {
    this.userInfo = data
  }

  resetAuthorization = () => {
    this.removeToken()
    this.resetUserInfo()
  }

  // 保存token
  storeToken = (token: string, refreshToken: string) => {
    setStorage("token", token)
    setStorage("refreshToken", refreshToken)
  }

  // 激活账户
  activeUser = async (params: IActiveRequest) => {
    try {
      const res = await apiUser.active(params)
      this.setUserInfo(res.data.data.userInfo)
      this.storeToken(res.data.data.token, res.data.data.refreshToken)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    }
  }

  // 清除token
  removeToken = () => {
    removeStroage("token")
    removeStroage("refreshToken")
  }

  resetUserInfo = () => {
    eventBus.emit(events.beforeResetUserInfo)
    this.setUserInfo({ ...initialUserInfo })
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
    if (this.refreshToken && this.token && this.authed) {
      try {
        const res = await apiUser.refreshToken({
          token: this.token,
          refreshToken: this.refreshToken,
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

  getProfile = async () => {
    if (this.authed) {
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

  editProfile = async (data: IEditProfileRequest) => {
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
