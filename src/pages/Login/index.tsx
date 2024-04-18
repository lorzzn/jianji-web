import LoginForm from "@/components/LoginForm/LoginForm"
import { joinStaticsUrl } from "@/components/ZImage/utils"
import { useStore } from "@/store"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { observer } from "mobx-react"
import { useEffect } from "react"

const Login = observer(() => {
  const { userStore } = useStore()
  const { authed } = userStore

  const onLogin = () => {
    // 登录成功后跳转到首页
    window.location.href = "/"
  }

  useEffect(() => {
    if (authed) {
      window.location.href = "/"
    }
  }, [])

  return (
    <div
      className={twclx([
        "flex justify-center items-center flex-1",
        css`
          background: url(${joinStaticsUrl("!/backgrounds/login.jpg")}) no-repeat center center;
        `,
      ])}
    >
      <div className="w-96 h-fit p-5 rounded-lg bg-white">
        <div className="text-2xl font-bold">登录/注册</div>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
})

export default Login
