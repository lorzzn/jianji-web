import { IApiCommonResponse } from "@/api/types/response/common"
import { AxiosResponse } from "axios"

class ServiceError extends Error {
  response: AxiosResponse<IApiCommonResponse, any>

  constructor(e: AxiosResponse<IApiCommonResponse, any>) {
    super(e.data.message ?? undefined)
    this.name = "ServiceError"
    this.response = e
  }
}

export default ServiceError
