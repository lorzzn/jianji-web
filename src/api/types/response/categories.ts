import { IApiCommonResponse } from "./common"

export interface ICategories {
  label: string
  value: number
  parentValue: number | null
  ordinalNumber: number | null
}

export interface ICategoriesResponse extends IApiCommonResponse {
  data: ICategories[]
}
