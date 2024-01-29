import { FC, useRef } from "react"
import ZModal, { ZModalRef } from "../ZModal/ZModal"
import { observer } from "mobx-react"
import rootStore from "@/store"

const LoginDialog:FC = () => {
  const ref = useRef<ZModalRef | null>(null)
  const setRef = (r:ZModalRef) => {
    ref.current = r
    dialogStore.register("LoginDialog", ref)
  }

  const dialogStore = rootStore.dialogStore
  
  return <ZModal
    ref={setRef}
    title="登录/注册"
  >
    <div className="flex flex-col w-full">
      
    </div>
  </ZModal>
}

export default observer(LoginDialog)
