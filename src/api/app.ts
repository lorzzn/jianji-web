import service from "@/utils/service"
import { IGetAppConfigResp, IGetPublicKeyResp } from "./types/response/app"
import pureService from "@/utils/pureService"

export const apiApp = {
  getPublicKey() {
    return pureService<IGetPublicKeyResp>({
      url: "/api/common/app/public-key",
      withCredentials: false,
    })
  },
  getAppConfig() {
    return service<IGetAppConfigResp>({
      url: "/api/common/app/config",
      withCredentials: true,
      withToken: false
    })
  }
}
