import service from "@/utils/service"
import {
  ICreatePostRequest,
  IDeletePostRequest,
  IGetPostRequest,
  IListPostsRequest,
  IUpdatePostRequest,
} from "./types/request/posts"
import { IListPostsResponse, IPostResponse } from "./types/response/posts"

export const apiPosts = {
  list(data?: IListPostsRequest) {
    return service<IListPostsResponse>({
      url: "/api/v1/posts/list",
      method: "POST",
      data,
    })
  },
  get(data?: IGetPostRequest) {
    return service<IPostResponse>({
      url: "/api/v1/posts/get",
      method: "POST",
      data,
    })
  },
  update(data?: IUpdatePostRequest) {
    return service<IPostResponse>({
      url: "/api/v1/posts/update",
      method: "POST",
      data,
    })
  },
  create(data?: ICreatePostRequest) {
    return service<IPostResponse>({
      url: "/api/v1/posts/create",
      method: "POST",
      data,
    })
  },
  delete(data?: IDeletePostRequest) {
    return service({
      url: "/api/v1/posts/delete",
      method: "POST",
      data,
    })
  },
}
