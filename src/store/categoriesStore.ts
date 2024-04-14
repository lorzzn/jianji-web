import { apiCategories } from "@/api/categories"
import { ICategory } from "@/api/types/request/categories"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class CategoriesStore {
  categories: ICategory[] = []
  categoriesLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  setCategories = (categories: ICategory[]) => {
    this.categories = categories
  }

  setCategoriesLoading = (loading: boolean) => {
    this.categoriesLoading = loading
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

  updateCategories = async (data: ICategory[]) => {
    this.setCategoriesLoading(true)
    try {
      const res = await apiCategories.update({ data })
      const categories = clone(this.categories)
      res.data.data.forEach((item) => {
        const target = categories.find((c) => c.value === item.value)
        if (!target) {
          categories.push(item)
        } else {
          assign(target, item)
        }
      })
      this.setCategories(categories)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }

  createCategories = async (data: Partial<ICategory>[], callback?: (created: ICategory[] | null) => void) => {
    this.setCategoriesLoading(true)
    try {
      const res = await apiCategories.create({ data })
      const categories = clone(this.categories)
      categories.push(...res.data.data)
      callback?.(res.data.data)
      this.setCategories(categories)
    } catch (error) {
      callback?.(null)
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }

  deleteCategories = async (value: number[] | number) => {
    this.setCategoriesLoading(true)
    try {
      await apiCategories.delete({ value })
      let categories = clone(this.categories)
      if (Array.isArray(value)) {
        categories = categories.filter((c) => !value.includes(c.value))
      } else {
        const index = categories.findIndex((c) => c.value === value)
        if (index > -1) {
          categories.splice(index, 1)
        }
      }
      this.setCategories(categories)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setCategoriesLoading(false)
  }
}

export default CategoriesStore
