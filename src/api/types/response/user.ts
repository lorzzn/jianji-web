import { IApiCommonResp } from "./common"

export interface IUserInfo {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  name: string
  avatar: string
  email: string
  status: number
}

export interface ILoginResp extends IApiCommonResp {
  data: {
    userInfo: IUserInfo
    token: string
    refreshToken: string
  }
}

export interface IActiveResp extends ILoginResp {}

export interface IRefreshTokenResp extends IApiCommonResp {
  data: {
    token: string
    refreshToken: string
  }
}

export interface IProfileResp extends IApiCommonResp {
  data: {
    userInfo: IUserInfo
  }
}

export interface IEditProfileResp extends IApiCommonResp {
  data: {
    userInfo: IUserInfo
  }
}
