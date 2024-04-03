import { apiCategories } from "@/api/categories"
import { ICategories } from "@/api/types/response/categories"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class PostStore {
  categories: ICategories[] = []
  categoriesLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  getCategories = async () => {
    this.categoriesLoading = true
    try {
      const res = await apiCategories.list()
      this.categories = res.data.data
    } catch (error) {
      errorHandler.handle(error)
    }
    this.categoriesLoading = false
  }

  updateCategories = async (data: ICategories[]) => {
    this.categoriesLoading = true
    try {
      const res = await apiCategories.update({ data })
      res.data.data.forEach((item) => {
        const target = this.categories.find((c) => c.value === item.value)
        if (!target) {
          this.categories.push(item)
        } else {
          assign(target, item)
        }
      })
      this.categories = clone(this.categories)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.categoriesLoading = false
  }
}

export default PostStore
