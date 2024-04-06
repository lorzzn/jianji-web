export interface ITag {
  value: number
  label?: string
}

export interface ITagUpdateRequest {
  data: ITag[]
}

export interface ITagCreateRequest {
  data: Partial<ITag>[]
}

export interface ITagDeleteRequest {
  value: number | number[]
}
