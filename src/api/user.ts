import service from "@/utils/service"
import { ILoginReq } from "./typings/request/user"


export const apiUser = {
  login(data: ILoginReq) {
    return service({
      url: "api/v1/user/login",
      method: "POST",
      data,
      encrypt: true,
    })
  }
}
