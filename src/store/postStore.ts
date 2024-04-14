import { ITag } from "@/api/types/request/tags"
import { ICategory } from "@/api/types/response/categories"
import { makeAutoObservable } from "mobx"

class PostStore {
  uuid: string | null = null // 文章uuid
  category: ICategory | null = null // 当前文章的分类
  tags: ITag[] | null = null // 当前文章的标签
  title: string = ""
  content: string = ""
  favoured: boolean = false
  public: boolean = false
  status: number = 1

  constructor() {
    makeAutoObservable(this)
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

  

}

export default PostStore
