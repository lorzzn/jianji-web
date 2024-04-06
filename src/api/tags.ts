import service from "@/utils/service"
import { ITagCreateRequest, ITagDeleteRequest, ITagUpdateRequest } from "./types/request/tags"
import { ITagsResponse } from "./types/response/tags"

export const apiTags = {
  list() {
    return service<ITagsResponse>({
      url: "/api/v1/tags/list",
      method: "POST",
    })
  },
  update(data?: ITagUpdateRequest) {
    return service<ITagsResponse>({
      url: "/api/v1/tags/update",
      method: "POST",
      data,
    })
  },
  create(data?: ITagCreateRequest) {
    return service<ITagsResponse>({
      url: "/api/v1/tags/create",
      method: "POST",
      data,
    })
  },
  delete(data?: ITagDeleteRequest) {
    return service({
      url: "/api/v1/tags/delete",
      method: "POST",
      data,
    })
  },
}
