import { apiTags } from "@/api/tags"
import { ITags } from "@/api/types/response/tags"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class TagsStore {
  tags: ITags[] = []
  tagsLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  setTags = (tags: ITags[]) => {
    this.tags = tags
  }

  setTagsLoading = (loading: boolean) => {
    this.tagsLoading = loading
  }

  getTags = async () => {
    this.setTagsLoading(true)
    try {
      const res = await apiTags.list()
      this.setTags(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setTagsLoading(false)
  }

  updateTags = async (data: ITags[]) => {
    this.setTagsLoading(true)
    try {
      const res = await apiTags.update({ data })
      res.data.data.forEach((item) => {
        const target = this.tags.find((c) => c.value === item.value)
        if (!target) {
          this.tags.push(item)
        } else {
          assign(target, item)
        }
      })
      this.setTags(clone(this.tags))
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setTagsLoading(false)
  }

  createTags = async (data: Partial<ITags>[], callback?: (created: ITags[] | null) => void) => {
    this.setTagsLoading(true)
    try {
      const res = await apiTags.create({ data })
      this.tags.push(...res.data.data)
      callback?.(res.data.data)
      this.setTags(clone(this.tags))
    } catch (error) {
      callback?.(null)
      errorHandler.handle(error)
    }
    this.setTagsLoading(false)
  }

  deleteTags = async (value: number[] | number) => {
    this.setTagsLoading(true)
    try {
      await apiTags.delete({ value })
      if (Array.isArray(value)) {
        this.tags = this.tags.filter((c) => !value.includes(c.value))
      } else {
        const index = this.tags.findIndex((c) => c.value === value)
        if (index > -1) {
          this.tags.splice(index, 1)
        }
      }
      this.setTags(clone(this.tags))
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setTagsLoading(false)
  }
}

export default TagsStore
