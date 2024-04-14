import { IApiCommonResponse } from "./common"

/** */
export interface ICategory {
  label: string
  value: number
  parentValue: number | null
  ordinalNumber: number | null
}

export interface ICategoriesResponse extends IApiCommonResponse {
  data: ICategory[]
}
