import { ICategory } from "./categories"
import { ITag } from "./tags"

export interface IPost {
  uuid: string | null
  category: ICategory | null
  categoryValue: ICategory["value"] | null
  tags: ITag[] | null
  title: string
  content: string
  favoured: boolean
  public: boolean
  status: number
}

export interface IUpdatePostRequest extends Partial<IPost> {
  uuid: string
}

export interface ICreatePostRequest extends Partial<Omit<IPost, "uuid">> {
}

export interface IDeletePostRequest {
  uuid: string 
}
