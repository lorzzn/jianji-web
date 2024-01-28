import { makeAutoObservable } from "mobx";
import LayoutStore from "./layoutStore";

class RootStore {
  layoutStore;

  constructor(){
    this.layoutStore = new LayoutStore()

    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export default rootStore
