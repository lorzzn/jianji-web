export interface ICategory {
  value: number
  parentValue: number | null
  label?: string
  ordinalNumber?: number | null
}

export interface IUpdateCategoriesRequest {
  data: ICategory[]
}

export interface ICreateCategoriesRequest {
  data: Partial<ICategory>[]
}

export interface IDeleteCategoriesRequest {
  value: number | number[]
}
