import ZButton from "@/components/ZButton/ZButton";
import ZCheckBox from "@/components/ZCheckBox/ZCheckBox";
import ZForm from "@/components/ZForm/ZForm";
import { joinAssetsUrl } from "@/components/ZImage/utils";
import ZInput from "@/components/ZInput/ZInput";
import useDialog, { dialogNames } from "@/hooks/useDialog";
import useLogin, { ILoginFormData } from "@/hooks/useLogin";
import { useStore } from "@/store";
import errorHandler from "@/utils/errorHandler";
import { twclx } from "@/utils/twclx";
import Yup from "@/utils/yup";
import { css } from "@emotion/css";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const yupSchema = Yup.object().shape({
  email: Yup.string().email("请您输入格式正确的邮箱地址").required("请您输入邮箱"),
  password: Yup.string().required("请您输入密码"),
})

const Login:FC = () => {
  
  const [agreed, setAgreed] = useState<boolean | undefined>(false)
  const { dialog: activeDialog } = useDialog(dialogNames.ActiveDialog)
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const { login } = useLogin()
  const { userStore, appStore } = useStore()

  const loginFormData: ILoginFormData = {
    email: "",
    password: "",
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormData>({
    defaultValues: loginFormData,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  })

  const onAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setAgreed(checked)
  }

  const onSubmit = async (formData: ILoginFormData) => {
    setLoginLoading(true)
    try {
      formData.fingerprint = appStore.fingerprint
      const res = await login(formData)

      // 如果是新注册的用户，弹出激活邮箱提示
      if (res.data.data.userInfo.status === 0) {
        activeDialog()?.show()
      } else {
        userStore.setUserInfo(res.data.data.userInfo)
        userStore.storeToken(res.data.data.token, res.data.data.refreshToken)
      }
    } catch (error) {
      errorHandler.handle(error)
    }
    setLoginLoading(false)
  }

  return <div className={twclx([
    "flex justify-center items-center flex-1",
    css`
      background: url(${joinAssetsUrl("!/backgrounds/login.jpg")}) no-repeat center center;
    `
  ])}>
    <div className="w-96 h-fit p-6 rounded bg-white">
      <div className="text-2xl font-bold">登录/注册</div>
      <ZForm onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
        <div>
          <ZInput className="w-full mb-4 mt-4" scale="large" placeholder="请输入邮箱" {...register("email")} />
          <ZInput
            type="password"
            className="w-full mb-3"
            scale="large"
            placeholder="请输入密码"
            {...register("password")}
          />
          <div className="flex justify-between">
            <ZCheckBox
              checked={agreed}
              onChange={onAgreedChange}
              label={
                <span className="text-sm flex items-center space-x-1 leading-4">
                  <span>接受</span>
                  <a className="text-blue-500 hover:text-blue-400" href="/">
                    用户协议
                  </a>
                  <span>和</span>
                  <a className="text-blue-500 hover:text-blue-400" href="/">
                    隐私政策
                  </a>
                </span>
              }
            />
            <a className="text-sm text-blue-500 hover:text-blue-400 leading-4" href="/">
              忘记密码
            </a>
          </div>
          <div className="text-sm mt-1 text-red-500">{errors.email?.message ?? errors.password?.message}</div>
        </div>

        <div className="flex flex-col items-center mt-14">
          <ZButton disabled={!agreed} className="w-full" scale="large" loading={loginLoading}>
            登录/注册
          </ZButton>
          <span className="text-xs text-gray-900 mt-2">未注册的邮箱，我们将帮助您注册账号</span>
        </div>
      </ZForm>
    </div>
  </div>
}

export default Login
