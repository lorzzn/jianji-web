import { IApiCommonResponse } from "./common"

export interface ITag {
  label: string
  value: number
}

export interface ITagStatistics {
  totalPosts: number
  createAt: string
  updatedAt: string
}

export interface ITagsResponse extends IApiCommonResponse {
  data: ITag[]
}

export interface ITagStatisticsResponse extends IApiCommonResponse {
  data: ITagStatistics
}
