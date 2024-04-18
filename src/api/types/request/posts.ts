import { ICategory } from "./categories"
import { IPageInfo } from "./pageInfo"
import { ITag } from "./tags"

export interface IPost {
  uuid: string | null
  categoryValue: ICategory["value"] | null
  tagValues: ITag["value"][] | null
  title: string
  content: string
  description: string
  favoured: boolean
  archived: boolean
  public: boolean
  status: number
}

export interface IUpdatePostRequest extends Partial<IPost> {
  uuid: string
}

export interface ICreatePostRequest extends Partial<Omit<IPost, "uuid">> {}

export interface IGetPostRequest {
  uuid: string
}

export interface IDeletePostRequest {
  uuid: string
}

export interface IListPostsRequest extends Partial<IPageInfo> {
  archived?: boolean
  favoured?: boolean
  sortBy?: "created_at" | "updated_at"
  sortType?: "desc" | "asc"
  tagValues?: number[]
  categoryValue?: number
  keyword?: string
}
