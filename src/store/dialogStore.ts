import { ZModalProps, ZModalRef } from "@/components/ZModal/ZModal"
import { merge } from "lodash"
import { makeAutoObservable } from "mobx"
import { RefObject } from "react"

interface IDialog {
  name: string
  ref: RefObject<ZModalRef>
  config?: any
}

class DialogStore {
  dialogList: IDialog[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // 注册弹窗，name 值是唯一的
  register = (name: string, ref: RefObject<ZModalRef>) => {
    const existingDialog = this.dialogList.find((dialog) => dialog.name === name)
    if (existingDialog) {
      existingDialog.ref = ref
    } else {
      this.dialogList.push({ name, ref })
    }
  }

  unregister = (name: string) => {
    this.dialogList = this.dialogList.filter((dialog) => dialog.name !== name)
  }

  dialog = (name: string): ZModalRef | null | undefined => {
    const dialog = this.dialogList.find((dialog) => dialog.name === name)
    return dialog?.ref.current
  }

  show = (name: string, config?: ZModalProps) => {
    const dialog = this.dialogList.find((dialog) => dialog.name === name)
    if (dialog) {
      merge(dialog.config, config)
      dialog.ref.current?.show()
    }
  }

  hide = (name: string, config?: ZModalProps) => {
    const dialog = this.dialogList.find((dialog) => dialog.name === name)
    if (dialog) {
      merge(dialog.config, config)
      dialog.ref.current?.hide()
    }
  }
}

export default DialogStore
