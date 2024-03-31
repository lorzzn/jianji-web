export interface ILoginRequest {
  email: string
  password: string
  fingerprint?: string
}

export interface IActiveRequest {
  email: string
  state: string
}

export interface IRefreshTokenRequest {
  token: string
  refreshToken: string
}

export interface IEditProfileRequest {
  name: string
}
