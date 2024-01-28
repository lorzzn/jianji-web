import { UniDialogProps } from "@/components/UniDialog/UniDialog";
import { makeAutoObservable } from "mobx";


class DialogStore {

  topId:number = 0

  constructor() {
    makeAutoObservable(this)
  }


}

export default DialogStore
