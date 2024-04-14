import { ITag } from "../request/tags"
import { ICategory } from "./categories"
import { IApiCommonResponse } from "./common"

export interface IPost {
  uuid: string | null
  category: ICategory | null
  tags: ITag[] | null
  title: string
  content: string
  favoured: boolean
  public: boolean
  status: number
}

export interface IPostsResponse extends IApiCommonResponse {
  data: IPost[]
}

export interface IPostResponse extends IApiCommonResponse {
  data: IPost
}
