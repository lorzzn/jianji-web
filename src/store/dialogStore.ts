import { UniDialogProps, UniDialogRef } from "@/components/UniDialog/UniDialog";
import { merge } from "lodash";
import { makeAutoObservable } from "mobx";
import { RefObject } from "react";

interface IDialog {
  name: string
  ref: RefObject<UniDialogRef>
  config?: any
}

class DialogStore {

  dialogs:IDialog[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // 注册弹窗，name 值是唯一的
  register = (name:string, ref: RefObject<UniDialogRef>) => {
    const existingDialog = this.dialogs.find(dialog => dialog.name === name)
    if (existingDialog) {
      existingDialog.ref = ref
    } else {
      this.dialogs.push({ name, ref })
    }
  }

  unregister = (name:string) => {
    this.dialogs = this.dialogs.filter(dialog => dialog.name !== name)
  }

  show = (name:string, config?:UniDialogProps) => {
    const dialog = this.dialogs.find(dialog => dialog.name === name)
    if (dialog) {
      merge(dialog.config, config)
      dialog.ref.current?.show()
    }
  }

  hide = (name:string, config?:UniDialogProps) => {
    const dialog = this.dialogs.find(dialog => dialog.name === name)
    if (dialog) {
      merge(dialog.config, config)
      dialog.ref.current?.hide()
    }
  }

}

export default DialogStore
