import { makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import AppStore from "./appStore"
import CategoriesStore from "./categoriesStore"
import DialogStore from "./dialogStore"
import LayoutStore from "./layoutStore"
import PostStore from "./postStore"
import TagsStore from "./tagsStore"
import UserStore from "./userStore"

class RootStore {
  appStore
  layoutStore
  userStore
  dialogStore
  postStore
  categoriesStore
  tagsStore

  constructor() {
    this.appStore = new AppStore()
    this.layoutStore = new LayoutStore()
    this.userStore = new UserStore()
    this.dialogStore = new DialogStore()
    this.postStore = new PostStore()
    this.categoriesStore = new CategoriesStore()
    this.tagsStore = new TagsStore()

    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export const StoreContext = createContext(rootStore)

export const useStore = () => {
  return useContext(StoreContext)
}

export default rootStore
