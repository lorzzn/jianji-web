export interface ITag {
  value: number
  label?: string
}

export interface IUpdateTagsRequest {
  data: ITag[]
}

export interface ICreateTagsRequest {
  data: Partial<ITag>[]
}

export interface IDeleteTagsRequest {
  value: number | number[]
}
