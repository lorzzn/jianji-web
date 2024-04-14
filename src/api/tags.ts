import service from "@/utils/service"
import { ICreateTagsRequest, IDeleteTagsRequest, IUpdateTagsRequest } from "./types/request/tags"
import { ITagsResponse } from "./types/response/tags"

export const apiTags = {
  list() {
    return service<ITagsResponse>({
      url: "/api/v1/tags/list",
      method: "POST",
    })
  },
  update(data?: IUpdateTagsRequest) {
    return service<ITagsResponse>({
      url: "/api/v1/tags/update",
      method: "POST",
      data,
    })
  },
  create(data?: ICreateTagsRequest) {
    return service<ITagsResponse>({
      url: "/api/v1/tags/create",
      method: "POST",
      data,
    })
  },
  delete(data?: IDeleteTagsRequest) {
    return service({
      url: "/api/v1/tags/delete",
      method: "POST",
      data,
    })
  },
}
