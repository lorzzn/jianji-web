import { apiTags } from "@/api/tags"
import { ITag } from "@/api/types/response/tags"
import { ITag as IRequestTag } from "@/api/types/request/tags"
import errorHandler from "@/utils/errorHandler"
import { assign, clone } from "lodash"
import { makeAutoObservable } from "mobx"

class TagsStore {
  tags: ITag[] = []
  tagsLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  setTags = (tags: ITag[]) => {
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

  updateTags = async (data: ITag[]) => {
    this.setTagsLoading(true)
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
    this.setTagsLoading(false)
  }

  createTags = async (data: Partial<IRequestTag>[], callback?: (created: ITag[] | null) => void) => {
    this.setTagsLoading(true)
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
    this.setTagsLoading(false)
  }

  deleteTags = async (value: number[] | number) => {
    this.setTagsLoading(true)
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
    this.setTagsLoading(false)
  }
}

export default TagsStore
