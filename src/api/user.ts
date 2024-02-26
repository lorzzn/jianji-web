import service from "@/utils/service"
import { ILoginReq, IRefreshTokenReq } from "./typings/request/user"
import { ILoginResp, IProfileResp, IRefreshTokenResp } from "./typings/response/user"


export const apiUser = {
  login(data: ILoginReq) {
    return service<ILoginResp>({
      url: "api/v1/user/login",
      method: "POST",
      encrypt: true,
      data,
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
  }
}
