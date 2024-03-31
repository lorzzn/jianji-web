import service from "@/utils/service"
import { ICategoriesResponse } from "./types/response/categories"

export const apiCategories = {
  list() {
    return service<ICategoriesResponse>({
      url: "/api/v1/categories/list",
      method: "POST",
    })
  },
}
