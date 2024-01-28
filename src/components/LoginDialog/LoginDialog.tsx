import { FC, useEffect, useRef, useState } from "react"
import UniDialog, { UniDialogRef } from "../UniDialog/UniDialog"
import { observer } from "mobx-react"
import rootStore from "@/store"

const LoginDialog:FC = () => {
  const ref = useRef<UniDialogRef | null>(null)
  const setRef = (r:UniDialogRef) => {
    ref.current = r
    dialogStore.register("LoginDialog", ref)
  }

  const dialogStore = rootStore.dialogStore
  
  return <UniDialog
    ref={setRef}
    title="标题"
    footer={"脚"}
  >
    <div >
      你好
    </div>
  </UniDialog>
}

export default observer(LoginDialog)
