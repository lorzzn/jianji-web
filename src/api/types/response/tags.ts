import { IApiCommonResponse } from "./common"

export interface ITag {
  label: string
  value: number
}

export interface ITagsResponse extends IApiCommonResponse {
  data: ITag[]
}
