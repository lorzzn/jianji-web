import service from "@/utils/service"
import { ICategoriesUpdateRequest } from "./types/request/categories"
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
}
