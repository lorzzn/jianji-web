export interface ICategories {
  value: number
  parentValue: number | null
  label?: string
  ordinalNumber?: number
}

export interface ICategoriesUpdateRequest {
  data: ICategories[]
}
