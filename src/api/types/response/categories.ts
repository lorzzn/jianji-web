import { IApiCommonResponse } from "./common"

export interface ICategories {
  label: string
  value: number
  parentValue: number
  path: string
}

export interface ICategoriesResponse extends IApiCommonResponse {
  data: ICategories[]
}
