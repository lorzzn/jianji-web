import { IApiCommonResp } from "./common";

export interface IGetPublicKeyResp extends IApiCommonResp {
  data: {
    publicKey: string
  }
}

export interface IGetAppConfigResp extends IApiCommonResp {
  data: {
    time: number
  }
}
