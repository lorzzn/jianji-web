import { IEditProfileReq } from "@/api/types/request/user";
import { IUserInfo } from "@/api/types/response/user";
import { apiUser } from "@/api/user";
import errorHandler from "@/utils/errorHandler";
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

    this.requestRefreshToken()
    this.fetchProfile()
  }

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
    this.setUserInfo({ ...this.initialUserInfo })
  }

  logout = async () => {
    try {
      const res = await apiUser.logout()
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
      } catch (error) {
        errorHandler.handle(error)
      }
    }
  }

  fetchProfile = async () => {
    if (this.token) {
      try {
        const res = await apiUser.profile()
        if (res.data.code === code.USER_NOT_LOGIN) {
          this.removeToken()
          return
        }

        this.setUserInfo(res.data.data.userInfo)
      } catch (error) {
        errorHandler.handle(error)
      }
    }
  }

  editProfile = async (data: IEditProfileReq) => {
    try {
      const res = await apiUser.editProfile(data)
      this.setUserInfo(res.data.data.userInfo)
    } catch (error) {
      errorHandler.handle(error)
    }
  }

}

export default UserStore
