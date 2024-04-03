import { apiCategories } from "@/api/categories"
import { ICategories } from "@/api/types/response/categories"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class PostStore {
  categories: ICategories[] = []
  categoriesLoading: boolean = false
  selectedCategory: ICategories | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setCategories = (categories: ICategories[]) => {
    this.categories = categories
  }

  setCategoriesLoading = (loading: boolean) => {
    this.categoriesLoading = loading
  }

  setSelectedCategory = (category: ICategories | null) => {
    this.selectedCategory = category
  }

  getCategories = async () => {
    this.setCategoriesLoading(true)
    try {
      const res = await apiCategories.list()
      this.setCategories(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }

  updateCategories = async (data: ICategories[]) => {
    this.setCategoriesLoading(true)
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
      this.setCategories(clone(this.categories))
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }
}

export default PostStore
