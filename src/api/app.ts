import pureService from "@/utils/pureService"
import service from "@/utils/service"
import { IGetAppConfigResponse, IGetPublicKeyResponse } from "./types/response/app"

export const apiApp = {
  getPublicKey() {
    return pureService<IGetPublicKeyResponse>({
      url: "/api/common/app/public-key",
      withCredentials: false,
    })
  },
  getAppConfig() {
    return service<IGetAppConfigResponse>({
      url: "/api/common/app/config",
      withCredentials: true,
      withToken: false,
    })
  },
}
