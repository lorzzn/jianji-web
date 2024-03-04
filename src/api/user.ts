import service from "@/utils/service"
import { ILoginReq, IRefreshTokenReq, IEditProfileReq, IActiveReq } from "./types/request/user"
import { IActiveResp, IEditProfileResp, ILoginResp, IProfileResp, IRefreshTokenResp } from "./types/response/user"


export const apiUser = {
  login(data: ILoginReq) {
    return service<ILoginResp>({
      url: "api/v1/user/login",
      method: "POST",
      encrypt: true,
      data,
    })
  },
  logout() {
    return service({
      url: "api/v1/user/logout",
      method: "POST"
    })
  },
  active(data: IActiveReq) {
    return service<IActiveResp>({
      url: "api/v1/user/active",
      method: "POST",
      data
    })
  },
  refreshToken(data: IRefreshTokenReq){
    return service<IRefreshTokenResp>({
      url: "api/v1/user/refresh-token",
      withCredentials: false,
      method: "POST",
      data
    })
  },
  profile(){
    return service<IProfileResp>({
      url: "api/v1/user/profile",
      method: "POST",
    })
  },
  editProfile(data: IEditProfileReq){
    return service<IEditProfileResp>({
      url: "api/v1/user/edit-profile",
      method: "POST",
      data,
    })
  }
}
