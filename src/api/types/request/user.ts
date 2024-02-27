
export interface ILoginReq {
  email: string
  password: string
}

export interface IRefreshTokenReq {
  token: string
  refreshToken: string
}

export interface IEditProfileReq {
  name: string
}
