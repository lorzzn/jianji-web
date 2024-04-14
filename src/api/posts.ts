import service from "@/utils/service"
import { IPostResponse, IPostsResponse } from "./types/response/posts"
import { ICreatePostRequest, IDeletePostRequest, IUpdatePostRequest } from "./types/request/posts"

export const apiPosts = {
  list() {
    return service<IPostsResponse>({
      url: "/api/v1/posts/list",
      method: "POST",
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
