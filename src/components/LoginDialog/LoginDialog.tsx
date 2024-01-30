import { FC, useRef, useState } from "react"
import ZModal, { ZModalRef } from "../ZModal/ZModal"
import { observer } from "mobx-react"
import rootStore from "@/store"
import ZForm from "../ZForm/ZForm"
import classNames from "classnames"
import ZInput from "../ZInput/ZInput"
import { useForm } from "react-hook-form"
import ZButton from "../ZButton/ZButton"
import ZCheckBox from "../ZCheckBox/ZCheckBox"

interface ILoginFormData {
  email: string
  password: string
}

const LoginDialog:FC = () => {
  const ref = useRef<ZModalRef | null>(null)
  const [ agreed, setAgreed] = useState<boolean | undefined>(false)

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
  })

  const onAgreedChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setAgreed(checked)
  }

  const onSubmit = (...args:any) => {

    console.log(args);
    
  }

  return <ZModal
    ref={setRef}
    title="登录/注册"
    classNames={{
      modal: classNames(['rounded-lg h-80', ])
    }}
  >
    <div className="flex flex-col w-full h-full">
      <ZForm 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div>
          <ZInput className="w-full mb-4 mt-4" scale="large" placeholder="请输入邮箱" {...register("email")}/>
          <ZInput className="w-full mb-2" scale="large" placeholder="请输入密码" {...register("password")}/>
          <div className="flex justify-between">
            <span className="text-sm flex items-center space-x-1">
              <ZCheckBox checked={agreed} onChange={onAgreedChange} />
              <span>接受</span>
              <a className="text-blue-500 hover:text-blue-400" href="/">用户协议</a>
              <span>和</span>
              <a className="text-blue-500 hover:text-blue-400" href="/">隐私政策</a>
            </span>
            <a className="text-sm text-blue-500 hover:text-blue-400" href="/">还没有注册, 去注册</a>
          </div>
        </div>
        {/* <ZInput /> */}

        <div>
          <ZButton disabled={!agreed} className="w-full" scale="large" >登录</ZButton>
        </div>
      </ZForm>

    </div>
  </ZModal>
}

export default observer(LoginDialog)
