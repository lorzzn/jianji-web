import service from "@/utils/service"
import {
  ICategoriesCreateRequest,
  ICategoriesDeleteRequest,
  ICategoriesUpdateRequest,
} from "./types/request/categories"
import { ICategoriesResponse } from "./types/response/categories"

export const apiCategories = {
  list() {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/list",
      method: "POST",
    })
  },
  update(data?: ICategoriesUpdateRequest) {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/update",
      method: "POST",
      data,
    })
  },
  create(data?: ICategoriesCreateRequest) {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/create",
      method: "POST",
      data,
    })
  },
  delete(data?: ICategoriesDeleteRequest) {
    return service({
      url: "/api/v1/categories/delete",
      method: "POST",
      data,
    })
  },
}
