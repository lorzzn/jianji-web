import { ITag } from "@/api/types/request/tags"
import { ICategory } from "@/api/types/response/categories"
import { makeAutoObservable } from "mobx"

class PostStore {
  category: ICategory | null = null // 当前文章的分类
  tag: ITag[] | null = null // 当前文章的标签

  constructor() {
    makeAutoObservable(this)
  }

  setCategory = (category: ICategory | null) => {
    this.category = category
  }
}

export default PostStore
