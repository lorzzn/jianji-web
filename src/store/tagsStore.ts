import { apiTags } from "@/api/tags"
import { ITag as IRequestTag } from "@/api/types/request/tags"
import { ITag } from "@/api/types/response/tags"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class TagsStore {
  tags: ITag[] = []
  loading: boolean = false
  loaded: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  setTags = (tags: ITag[]) => {
    this.tags = tags
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setLoaded = (loaded: boolean) => {
    this.loaded = loaded
  }

  getTags = async () => {
    this.setLoading(true)
    try {
      const res = await apiTags.list()
      this.setTags(res.data.data)
      this.setLoaded(true)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setLoading(false)
  }

  updateTags = async (data: ITag[]) => {
    this.setLoading(true)
    try {
      const res = await apiTags.update({ data })
      const tags = clone(this.tags)
      res.data.data.forEach((item) => {
        const target = tags.find((c) => c.value === item.value)
        if (!target) {
          tags.push(item)
        } else {
          assign(target, item)
        }
      })
      this.setTags(tags)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setLoading(false)
  }

  createTags = async (data: Partial<IRequestTag>[], callback?: (created: ITag[] | null) => void) => {
    this.setLoading(true)
    try {
      const res = await apiTags.create({ data })
      const tags = clone(this.tags)
      tags.push(...res.data.data)
      callback?.(res.data.data)
      this.setTags(tags)
    } catch (error) {
      callback?.(null)
      errorHandler.handle(error)
    }
    this.setLoading(false)
  }

  getTagStatistics = async (value: number[] | number) => {
    try {
      // todo 获取一组分类的数据，暂时没有需求
      if (Array.isArray(value) && value.length === 1) {
        value = value[0]
      }
      if (Array.isArray(value)) {
        return Promise.reject(new Error("未实现的操作"))
      }

      const res = await apiTags.statistics({ value })
      return Promise.resolve(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    }
  }

  deleteTags = async (value: number[] | number) => {
    this.setLoading(true)
    try {
      await apiTags.delete({ value })
      let tags = clone(this.tags)
      if (Array.isArray(value)) {
        tags = tags.filter((c) => !value.includes(c.value))
      } else {
        const index = tags.findIndex((c) => c.value === value)
        if (index > -1) {
          tags.splice(index, 1)
        }
      }
      this.setTags(tags)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setLoading(false)
  }
}

export default TagsStore
