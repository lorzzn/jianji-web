import { IApiCommonResp } from "./common";

export interface IUserInfo {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  avatar: string;
  email: string;
}

export interface ILoginResp extends IApiCommonResp {
  data: {
    userInfo: IUserInfo;
    isNewUser: boolean;
    token: string;
    refreshToken: string;
  }
}

export interface IRefreshTokenResp extends IApiCommonResp {
  data: {
    token: string
    refreshToken: string
  }
}
