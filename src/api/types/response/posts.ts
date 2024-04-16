import { ICategory } from "./categories"
import { IApiCommonResponse } from "./common"
import { IPageInfo } from "./pageInfo"
import { ITag } from "./tags"

export interface IPost {
  uuid: string
  category: ICategory | null
  tags: ITag[] | null
  title: string
  content: string
  description: string
  favoured: boolean
  archived: boolean
  public: boolean
  status: number
  createdAt: string
  updatedAt: string
}

export interface IPostResponse extends IApiCommonResponse {
  data: IPost
}

export interface IListPostsResponse extends IApiCommonResponse {
  data: {
    data: IPost[]
    pageInfo: IPageInfo
  }
}
