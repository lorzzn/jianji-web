import { ICategory } from "./categories"
import { ITag } from "./tags"

export interface IPost {
  uuid: string | null
  categoryValue: ICategory["value"] | null
  tagValues: ITag["value"][] | null
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
