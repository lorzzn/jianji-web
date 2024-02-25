import service from "@/utils/service"
import { IGetAppInfoResp, IGetPublicKeyResp } from "./typings/response/app"
import pkService from "@/utils/pkService"


export const apiApp = {
  fetchPublicKey() {
    return pkService<IGetPublicKeyResp>({
      url: "/api/common/app/public-key"
    })
  },
  fetchAppInfo() {
    return service<IGetAppInfoResp>({
      url: "/api/common/app/info"
    })
  }
}
