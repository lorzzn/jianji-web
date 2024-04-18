import { useContext } from "react"
import { ZMessageBoxContext } from "../ZMessageBoxContainer"

export const useZMessageBox = () => {
  const context = useContext(ZMessageBoxContext)
  if (!context) {
    throw new Error("useZModalBox must be used within a ZModalBoxContext")
  }
  return context
}
