import { IApiCommonResp } from "./common";

export interface IGetPublicKeyResp extends IApiCommonResp {
  data: {
    publicKey: string
  }
}

export interface IGetAppInfoResp extends IApiCommonResp {
  data: {
    time: number
  }
}
