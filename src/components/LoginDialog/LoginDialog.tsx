import useDialog, { dialogNames } from "@/hooks/useDialog"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC } from "react"
import LoginForm from "../LoginForm/LoginForm"
import ZModal from "../ZModal/ZModal"

const LoginDialog: FC = observer(() => {
  const { register: dialogRegister } = useDialog(dialogNames.LoginDialog)

  return (
    <ZModal
      ref={dialogRegister}
      title="登录/注册"
      classNames={{
        modal: classNames(["rounded-lg"]),
      }}
    >
      <div className="w-96">
        <LoginForm />
      </div>
    </ZModal>
  )
})

export default LoginDialog
