import service from "@/utils/service"
import {
  ICreateCategoriesRequest,
  IDeleteCategoriesRequest,
  IUpdateCategoriesRequest,
} from "./types/request/categories"
import { ICategoriesResponse } from "./types/response/categories"

export const apiCategories = {
  list() {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/list",
      method: "POST",
    })
  },
  update(data?: IUpdateCategoriesRequest) {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/update",
      method: "POST",
      data,
    })
  },
  create(data?: ICreateCategoriesRequest) {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/create",
      method: "POST",
      data,
    })
  },
  delete(data?: IDeleteCategoriesRequest) {
    return service({
      url: "/api/v1/categories/delete",
      method: "POST",
      data,
    })
  },
}
