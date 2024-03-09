import { ZModalRef } from "@/components/ZModal/ZModal"
import { useStore } from "@/store"
import { useRef } from "react"

export const dialogNames = {
  LoginDialog: "LoginDialog",
  HolaDialog: "HolaDialog",
  UserDialog: "UserDialog",
  ActiveDialog: "ActiveDialog",
}

const useDialog = (dialogName: string) => {
  
  const { dialogStore } = useStore()
  const ref = useRef<ZModalRef | null>(null)

  const register = (r: ZModalRef) => {
    ref.current = r
    dialogStore.register(dialogName, ref)
  }

  const dialog = ():ZModalRef|null|undefined => dialogStore.dialog(dialogName)

  return {
    register,
    dialog
  }

}

export default useDialog
