import { IApiCommonResponse } from "./common"

export interface IGetPublicKeyResponse extends IApiCommonResponse {
  data: {
    publicKey: string
  }
}

export interface ILocation {
  country: string
  city: string
}

export interface IGetAppConfigResponse extends IApiCommonResponse {
  data: {
    time: number
    sessionId: string
    location: ILocation
  }
}
