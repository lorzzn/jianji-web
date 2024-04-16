import { IApiCommonResponse } from "./common"

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

export interface IUserStatistics {
  totalPosts: number
  totalWords: number
}

export interface ILoginResponse extends IApiCommonResponse {
  data: {
    userInfo: IUserInfo
    token: string
    refreshToken: string
  }
}

export interface IActiveResponse extends ILoginResponse {}

export interface IRefreshTokenResponse extends IApiCommonResponse {
  data: {
    token: string
    refreshToken: string
  }
}

export interface IProfileResponse extends IApiCommonResponse {
  data: {
    userInfo: IUserInfo
  }
}

export interface IStatisticsResponse extends IApiCommonResponse {
  data: IUserStatistics
}

export interface IEditProfileResponse extends IApiCommonResponse {
  data: {
    userInfo: IUserInfo
  }
}
