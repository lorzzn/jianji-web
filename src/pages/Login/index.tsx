import LoginForm from "@/components/LoginForm/LoginForm"
import { joinAssetsUrl } from "@/components/ZImage/utils"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"

const Login = () => {
  const onLogin = () => {
    // 登录成功后跳转到首页
    window.location.href = "/"
  }

  return (
    <div
      className={twclx([
        "flex justify-center items-center flex-1",
        css`
          background: url(${joinAssetsUrl("!/backgrounds/login.jpg")}) no-repeat center center;
        `,
      ])}
    >
      <div className="w-96 h-fit p-5 rounded-lg bg-white">
        <div className="text-2xl font-bold">登录/注册</div>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}

export default Login
