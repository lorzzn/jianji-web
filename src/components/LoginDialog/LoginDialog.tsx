import { FC, useRef } from "react"
import ZModal, { ZModalRef } from "../ZModal/ZModal"
import { observer } from "mobx-react"
import rootStore from "@/store"
import ZForm from "../ZForm/ZForm"
import classNames from "classnames"
import styles from './index.module.scss'
import ZInput from "../ZInput/ZInput"
import { useForm } from "react-hook-form"
import ZButton from "../ZButton/ZButton"

interface ILoginFormData {
  email: string
  password: string
}

const LoginDialog:FC = () => {
  const ref = useRef<ZModalRef | null>(null)
  const setRef = (r:ZModalRef) => {
    ref.current = r
    dialogStore.register("LoginDialog", ref)
  }

  const dialogStore = rootStore.dialogStore

  const loginFormData:ILoginFormData = {
    email: "",
    password: ""
  }

  const { handleSubmit, register } = useForm<ILoginFormData>({
    defaultValues: loginFormData
  });

  const onSubmit = (...args:any) => {

    console.log(args);
    
  }

  return <ZModal
    ref={setRef}
    title="登录/注册"
    classNames={{
      modal: classNames(['rounded-lg', styles.loginDialog])
    }}
  >
    <div className="flex flex-col w-full">
      <ZForm 
        onSubmit={handleSubmit(onSubmit)}
      >
        <ZInput placeholder="请输入邮箱" {...register("email")}/>
        <ZInput placeholder="请输入密码" {...register("password")}/>
        {/* <ZInput /> */}

        <ZButton >登录/注册</ZButton>
      </ZForm>

    </div>
  </ZModal>
}

export default observer(LoginDialog)
