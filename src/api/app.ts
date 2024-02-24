import service from "@/utils/service"
import { IGetAppInfoResp, IGetPublicKeyResp } from "./typings/response/app"


export const apiApp = {
  getPublicKey() {
    return service<IGetPublicKeyResp>({
      url: "/api/common/app/public-key"
    })
  },
  getAppInfo() {
    return service<IGetAppInfoResp>({
      url: "/api/common/app/info"
    })
  }
}
