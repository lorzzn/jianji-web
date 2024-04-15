import { IPost, IUpdatePostRequest } from "@/api/types/request/posts"
import { IPost as IResponePost } from "@/api/types/response/posts"
import { ITag } from "@/api/types/request/tags"
import { ICategory } from "@/api/types/response/categories"
import { makeAutoObservable } from "mobx"
import { omit } from "lodash"
import { apiPosts } from "@/api/posts"
import errorHandler from "@/utils/errorHandler"
import { uuidjs } from "@/utils/uuid"
import { toast } from "react-toastify"
import { getPlainTextFromMarkdown } from "@/utils/stringFuncs"

class PostStore {
  uuid: string | null = null // 文章uuid
  category: ICategory | null = null // 当前文章的分类
  tags: ITag[] | null = null // 当前文章的标签
  title: string = ""
  content: string = ""
  description: string = ""
  favoured: boolean = false
  archived: boolean = false
  public: boolean = false
  status: number = 1
  remoteLoading: boolean = false
  createdAt: string = ""
  updatedAt: string = ""

  constructor() {
    makeAutoObservable(this)
  }

  get categoryValue() {
    return this.category?.value
  }

  get tagValues() {
    return this.tags?.map(t => t.value)
  }

  get postInfo(): IResponePost {
    return {
      uuid: this.uuid || uuidjs.NIL,
      category: this.category,
      tags: this.tags,
      title: this.title,
      content: this.content,
      description: this.description,
      favoured: this.favoured,
      archived: this.archived,
      public: this.public,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  get postInfoRequestParams (): Partial<IPost> {
    return {
      ...omit(this.postInfo, "category", "tags", "createdAt", "updatedAt"),
      categoryValue: this.categoryValue,
      tagValues: this.tagValues,
    }
  }

  setUuid = (value: string | null) => {
    this.uuid = value
  }

  setCategory = (value: ICategory | null) => {
    this.category = value
  }

  setTags = (value: ITag[] | null) => {
    this.tags = value
  }

  setTitle = (value: string) => {
    this.title = value
  }

  setContent = (value: string) => {
    this.content = value
  }

  setFavoured = (value: boolean) => {
    this.favoured = value
  }

  setArchived = (value: boolean) => {
    this.archived = value
  }

  setDescription = (value: string) => {
    this.description = value
  }

  setPublic = (value: boolean) => {
    this.public = value
  }

  setStatus = (value: number) => {
    this.status = value
  }

  setRemoteLoading = (value: boolean) => {
    this.remoteLoading = value
  }

  setPostInfo = (value: IResponePost) => {
    this.uuid = value.uuid
    this.category = value.category
    this.tags = value.tags
    this.title = value.title
    this.content = value.content
    this.description = value.description
    this.favoured = value.favoured
    this.archived = value.archived
    this.public = value.public
    this.status = value.status
    this.createdAt = value.createdAt
    this.updatedAt = value.updatedAt
  }

  getFromRemote = async (uuid: string) => {
    this.setRemoteLoading(true)
    try {
      const res = await apiPosts.get({ uuid })
      this.setPostInfo(res.data.data)
    } catch (error) {
      errorHandler.handle(error)
    }
    this.setRemoteLoading(false)
  }

  createOrSavePost = async () => {
    this.setRemoteLoading(true)
    try {
      if (!this.title) {
        toast.error("标题不能为空")
        return Promise.reject("标题不能为空")
      }
      if (!this.content) {
        toast.error("内容不能为空")
        return Promise.reject("内容不能为空")
      }
      if (!this.description) {
        this.setDescription(getPlainTextFromMarkdown(this.content).slice(0, 300))
      }
      const api = (this.uuid && this.uuid !== uuidjs.NIL) ? apiPosts.update:apiPosts.create
      const res = await api(this.postInfoRequestParams as IUpdatePostRequest)
      this.setPostInfo(res.data.data)
      return Promise.resolve(res)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    } finally {
      this.setRemoteLoading(false)
    }
  }

  deletePost = async () => {
    if (!this.uuid) return
    
    this.setRemoteLoading(true)
    try {
      const res = await apiPosts.delete({ uuid: this.uuid })
      return Promise.resolve(res)
    } catch (error) {
      errorHandler.handle(error)
      return Promise.reject(error)
    } finally {
      this.setRemoteLoading(false)
    }
  }

}

export default PostStore
