export interface ICategories {
  value: number
  parentValue: number | null
  label?: string
  ordinalNumber?: number | null
}

export interface ICategoriesUpdateRequest {
  data: ICategories[]
}

export interface ICategoriesCreateRequest {
  data: Partial<ICategories>[]
}
