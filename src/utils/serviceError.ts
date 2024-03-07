import { IApiCommonResp } from "@/api/types/response/common"
import { AxiosResponse } from "axios"

class ServiceError extends Error {
  response: AxiosResponse<IApiCommonResp, any>

  constructor(e: AxiosResponse<IApiCommonResp, any>) {
    super(e.data.message ?? undefined)
    this.name = 'ServiceError'
    this.response = e
  }

}

export default ServiceError
