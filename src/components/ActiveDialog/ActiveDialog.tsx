import useDialog, { dialogNames } from "@/hooks/useDialog"
import { FC } from "react"
import ZModal from "../ZModal/ZModal"

const ActiveDialog: FC = () => {
  const { register } = useDialog(dialogNames.ActiveDialog)

  return (
    <ZModal ref={register} title={"欢迎使用简记"}>
      <div>
        <div className="text-lg">请检查您的邮箱</div>
        <div>我们向您的邮箱发送了一封激活邮件，请打开邮件中的链接完成注册并登录您的账户</div>
        <div className="text-sm text-red-500 mt-2">注意：链接的有效时间为30分钟</div>
      </div>
    </ZModal>
  )
}

export default ActiveDialog
