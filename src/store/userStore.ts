import { IUserInfo } from "@/api/types/response/user";
import { apiUser } from "@/api/user";
import errorHandler from "@/utils/errorHandler";
import { getStorage, removeStroage, setStorage } from "@/utils/storage";
import { makeAutoObservable } from "mobx";

class UserStore {

  loading = false
  userInfo: IUserInfo= {
    id: 0,
    uuid: "",
    createdAt: "",
    updatedAt: "",
    name: "",
    avatar: "",
    email: "",
  }
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
        this.setUserInfo(res.data.data.userInfo)
      } catch (error) {
        errorHandler.handle(error)
      }
    }
  }

}

export default UserStore
