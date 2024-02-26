import service from "@/utils/service"
import { IGetAppConfigResp, IGetPublicKeyResp } from "./typings/response/app"
import pkService from "@/utils/pkService"


export const apiApp = {
  fetchPublicKey() {
    return pkService<IGetPublicKeyResp>({
      url: "/api/common/app/public-key"
    })
  },
  fetchAppConfig() {
    return service<IGetAppConfigResp>({
      url: "/api/common/app/config"
    })
  }
}
