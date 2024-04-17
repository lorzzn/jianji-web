import { IApiCommonResponse } from "./common"

/** */
export interface ICategory {
  label: string
  value: number
  parentValue: number | null
  ordinalNumber: number | null
}

export interface ICategoryStatistics {
  totalPosts: number
  createAt: string
  updatedAt: string
}

export interface ICategoriesResponse extends IApiCommonResponse {
  data: ICategory[]
}

export interface ICategoryStatisticsResponse extends IApiCommonResponse {
  data: ICategoryStatistics
}
