import { makeAutoObservable } from "mobx";
import LayoutStore from "./layoutStore";
import UserStore from "./userStore";
import DialogStore from "./dialogStore";
import AppStore from "./appStore";

class RootStore {
  appStore;
  layoutStore;
  userStore;
  dialogStore;

  constructor(){
    this.appStore = new AppStore()
    this.layoutStore = new LayoutStore()
    this.userStore = new UserStore()
    this.dialogStore = new DialogStore()

    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export default rootStore
