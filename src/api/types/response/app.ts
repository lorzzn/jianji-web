import { IApiCommonResp } from "./common";

export interface IGetPublicKeyResp extends IApiCommonResp {
  data: {
    publicKey: string
  }
}

export interface ILocation {
  country: string
  city: string
}

export interface IGetAppConfigResp extends IApiCommonResp {
  data: {
    time: number
    sessionId: string
    location: ILocation
  }
}
