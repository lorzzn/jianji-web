import { apiCategories } from "@/api/categories"
import { ICategories } from "@/api/types/response/categories"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class PostStore {
  categories: ICategories[] = [] // 文章可用的所有分类
  categoriesLoading: boolean = false // 分类加载状态
  category: ICategories | null = null // 当前文章的分类

  constructor() {
    makeAutoObservable(this)
  }

  setCategories = (categories: ICategories[]) => {
    this.categories = categories
  }

  setCategoriesLoading = (loading: boolean) => {
    this.categoriesLoading = loading
  }

  setCategory = (category: ICategories | null) => {
    this.category = category
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

  createCategories = async (data: Partial<ICategories>[], callback?: (created: ICategories[] | null) => void) => {
    this.setCategoriesLoading(true)
    try {
      const res = await apiCategories.create({ data })
      this.categories.push(...res.data.data)
      callback?.(res.data.data)
      this.setCategories(clone(this.categories))
    } catch (error) {
      callback?.(null)
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }
}

export default PostStore
