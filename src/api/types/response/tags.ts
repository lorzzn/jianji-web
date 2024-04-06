import { IApiCommonResponse } from "./common"

export interface ITags {
  label: string
  value: number
}

export interface ITagsResponse extends IApiCommonResponse {
  data: ITags[]
}
