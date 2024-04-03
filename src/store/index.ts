import { makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import AppStore from "./appStore"
import DialogStore from "./dialogStore"
import LayoutStore from "./layoutStore"
import PostStore from "./postStore"
import UserStore from "./userStore"

class RootStore {
  appStore
  layoutStore
  userStore
  dialogStore
  postStore

  constructor() {
    this.appStore = new AppStore()
    this.layoutStore = new LayoutStore()
    this.userStore = new UserStore()
    this.dialogStore = new DialogStore()
    this.postStore = new PostStore()

    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export const StoreContext = createContext(rootStore)

export const useStore = () => {
  return useContext(StoreContext)
}

export default rootStore
