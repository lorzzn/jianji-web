
export interface ILoginReq {
  email: string
  password: string
  fingerprint?: string
}

export interface IActiveReq {
  email: string
  state: string
}

export interface IRefreshTokenReq {
  token: string
  refreshToken: string
}

export interface IEditProfileReq {
  name: string
}
