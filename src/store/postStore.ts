import { IPost, IUpdatePostRequest } from "@/api/types/request/posts"
import { IPost as IResponePost } from "@/api/types/response/posts"
import { ITag } from "@/api/types/request/tags"
import { ICategory } from "@/api/types/request/categories"
import { makeAutoObservable } from "mobx"
import { omit } from "lodash"
import { apiPosts } from "@/api/posts"
import errorHandler from "@/utils/errorHandler"

class PostStore {
  uuid: string | null = null // 文章uuid
  category: ICategory | null = null // 当前文章的分类
  tags: ITag[] | null = null // 当前文章的标签
  title: string = ""
  content: string = ""
  favoured: boolean = false
  public: boolean = false
  status: number = 1
  remoteLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get categoryValue() {
    return this.category?.value
  }

  get tagValues() {
    return this.tags?.map(t => t.value)
  }

  get postInfo() {
    return {
      uuid: this.uuid,
      category: this.category,
      tags: this.tags,
      title: this.title,
      content: this.content,
      favoured: this.favoured,
      public: this.public,
      status: this.status,
    }
  }

  get postInfoRequestParams (): Partial<IPost> {
    return {
      ...omit(this.postInfo, "category", "tags"),
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
    this.favoured = value.favoured
    this.public = value.public
    this.status = value.status
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
      const api = this.uuid ? apiPosts.update:apiPosts.create
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

}

export default PostStore
