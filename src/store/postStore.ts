import { IPost } from "@/api/types/request/posts"
import { ITag } from "@/api/types/request/tags"
import { ICategory } from "@/api/types/request/categories"
import { makeAutoObservable } from "mobx"

class PostStore {
  uuid: string | null = null // 文章uuid
  category: ICategory | null = null // 当前文章的分类
  categoryValue: ICategory["value"] | null = null
  tags: ITag[] | null = null // 当前文章的标签
  title: string = ""
  content: string = ""
  favoured: boolean = false
  public: boolean = false
  status: number = 1

  constructor() {
    makeAutoObservable(this)
  }

  setUuid = (value: string | null) => {
    this.uuid = value
  }

  setCategory = (value: ICategory | null) => {
    this.category = value
  }

  setCategoryValue = (value: ICategory["value"] | null) => {
    this.categoryValue = value
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

  setPost = (value: IPost) => {
    this.setUuid(value.uuid)
    this.setCategory(value.category)
    this.setCategoryValue(value.categoryValue)
    this.setContent(value.content)
    this.setFavoured(value.favoured)
    this.setPublic(value.public)
    this.setTags(value.tags)
    this.setStatus(value.status)
    this.setTitle(value.title)
  }

}

export default PostStore
