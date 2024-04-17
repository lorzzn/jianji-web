import { apiCategories } from "@/api/categories"
import { ICategory } from "@/api/types/response/categories"
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

  getCategoryStatistics = async (value: number[] | number) => {
    try {
      // todo 获取一组分类的数据，暂时没有需求
      if (Array.isArray(value) && value.length === 1) {
        value = value[0]
      }
      if (Array.isArray(value)) {
        return Promise.reject(new Error("未实现的操作"))
      }

      const res = await apiCategories.statistics({ value })
      return Promise.resolve(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    }
  }

  deleteCategories = async (value: number[]) => {
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
