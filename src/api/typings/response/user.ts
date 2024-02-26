import { IApiCommonResp } from "./common";

interface UserInfo {
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
    userInfo: UserInfo;
    isNewUser: boolean;
    token: string;
    refreshToken: string;
  }
}
