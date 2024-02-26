import { FC, useState } from "react"
import ZModal from "../ZModal/ZModal"
import { observer } from "mobx-react"
import ZForm from "../ZForm/ZForm"
import classNames from "classnames"
import ZInput from "../ZInput/ZInput"
import { useForm } from "react-hook-form"
import ZButton from "../ZButton/ZButton"
import ZCheckBox from "../ZCheckBox/ZCheckBox"
import Yup from "@/utils/yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useLogin, { ILoginFormData } from "@/hooks/useLogin"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import rootStore from "@/store"

const yupSchema = Yup.object().shape({
  email: Yup.string().email('请您输入格式正确的邮箱地址').required('请您输入邮箱'),
  password: Yup.string().required('请您输入密码'),
})

const LoginDialog:FC = () => {
  const [ agreed, setAgreed] = useState<boolean | undefined>(false)
  const { register: dialogRegister, dialog: loginDialog } = useDialog(dialogNames.LoginDialog)
  const { dialog: holaDialog } = useDialog(dialogNames.HolaDialog)
  const { login } =  useLogin()

  const loginFormData:ILoginFormData = {
    email: "",
    password: ""
  }

  const { handleSubmit, register, formState: { errors } } = useForm<ILoginFormData>({
    defaultValues: loginFormData,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  })

  const onAgreedChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setAgreed(checked)
  }

  const onSubmit = async (formData: ILoginFormData) => {
    const res = await login(formData)
    // 隐藏登录窗口
    loginDialog()?.hide()

    rootStore.userStore.setUserInfo(res.data.data.userInfo)
    rootStore.userStore.storeToken(res.data.data.token, res.data.data.refreshToken)

    // 如果是注册用户，展示欢迎窗口
    if (res.data.data.isNewUser) {
      holaDialog()?.show()
    }

  }

  return <ZModal
    ref={dialogRegister}
    title="登录/注册"
    classNames={{
      modal: classNames(['rounded-lg', ])
    }}
  >
    <div className="flex flex-col w-full h-full">
      <ZForm 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div>
          <ZInput className="w-full mb-4 mt-4" scale="large" placeholder="请输入邮箱" {...register("email")}/>
          <ZInput type="password" className="w-full mb-3" scale="large" placeholder="请输入密码" {...register("password")}/>
          <div className="flex justify-between">
            <ZCheckBox checked={agreed} onChange={onAgreedChange} label={
              <span className="text-sm flex items-center space-x-1 leading-4">
                <span>接受</span>
                <a className="text-blue-500 hover:text-blue-400" href="/">用户协议</a>
                <span>和</span>
                <a className="text-blue-500 hover:text-blue-400" href="/">隐私政策</a>
              </span>
            }/>
            <a className="text-sm text-blue-500 hover:text-blue-400 leading-4" href="/">忘记密码</a>
          </div>
          <div className="text-sm mt-1 text-red-500">{errors.email?.message ?? errors.password?.message}</div>
        </div>

        <div className="flex flex-col items-center mt-14">
          <ZButton disabled={!agreed} className="w-full" scale="large" >登录/注册</ZButton>
          <span className="text-xs text-gray-900 mt-2">未注册的邮箱，我们将帮助您注册账号</span>
        </div>
      </ZForm>

    </div>
  </ZModal>
}

export default observer(LoginDialog)
