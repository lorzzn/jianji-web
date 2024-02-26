import service from "@/utils/service"
import { ILoginReq } from "./typings/request/user"
import { ILoginResp } from "./typings/response/user"


export const apiUser = {
  login(data: ILoginReq) {
    return service<ILoginResp>({
      url: "api/v1/user/login",
      method: "POST",
      data,
      encrypt: true,
    })
  }
}
