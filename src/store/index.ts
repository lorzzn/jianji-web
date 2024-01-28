import { makeAutoObservable } from "mobx";
import LayoutStore from "./layoutStore";
import UserStore from "./userStore";
import DialogStore from "./dialogStore";

class RootStore {
  layoutStore;
  userStore;
  dialogStore;

  constructor(){
    this.layoutStore = new LayoutStore()
    this.userStore = new UserStore()
    this.dialogStore = new DialogStore()

    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export default rootStore
