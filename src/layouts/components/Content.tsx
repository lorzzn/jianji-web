import ZButton from "@/components/ZButton/ZButton"
import { FC } from "react"
import { toast } from "react-toastify"

const Content:FC = () => {

  const onShowToastBtnCLick = () => {
    
    toast("hahaha")
  }

  return (
    <div className="h-screen flex flex-col space-y-1">
      Content
      <ZButton onClick={onShowToastBtnCLick}>测试弹窗</ZButton>
    </div>
  )
}

export default Content
