import service from "@/utils/service"
import {
  ICategoryStatisticsRequest,
  ICreateCategoriesRequest,
  IDeleteCategoriesRequest,
  IUpdateCategoriesRequest,
} from "./types/request/categories"
import { ICategoriesResponse, ICategoryStatisticsResponse } from "./types/response/categories"

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
  statistics(data?: ICategoryStatisticsRequest) {
    return service<ICategoryStatisticsResponse>({
      url: "/api/v1/categories/statistics",
      method: "POST",
      data,
    })
  },
}
