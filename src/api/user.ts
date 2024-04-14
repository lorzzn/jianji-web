import service from "@/utils/service"
import { IActiveRequest, IEditProfileRequest, ILoginRequest, IRefreshTokenRequest } from "./types/request/user"
import {
  IActiveResponse,
  IEditProfileResponse,
  ILoginResponse,
  IProfileResponse,
  IRefreshTokenResponse,
} from "./types/response/user"

export const apiUser = {
  login(data: ILoginRequest) {
    return service<ILoginResponse>({
      url: "api/v1/user/login",
      method: "POST",
      encrypt: true,
      withToken: false,
      data,
    })
  },
  logout() {
    return service({
      url: "api/v1/user/logout",
      method: "POST",
    })
  },
  active(data: IActiveRequest) {
    return service<IActiveResponse>({
      url: "api/v1/user/active",
      method: "POST",
      data,
    })
  },
  refreshToken(data: IRefreshTokenRequest) {
    return service<IRefreshTokenResponse>({
      url: "api/v1/user/refresh-token",
      withToken: false,
      method: "POST",
      data,
    })
  },
  profile() {
    return service<IProfileResponse>({
      url: "api/v1/user/profile",
      method: "POST",
    })
  },
  editProfile(data: IEditProfileRequest) {
    return service<IEditProfileResponse>({
      url: "api/v1/user/edit-profile",
      method: "POST",
      data,
    })
  },
}
