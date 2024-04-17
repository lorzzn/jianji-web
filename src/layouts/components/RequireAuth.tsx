import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth: FC<RequireAuthProps> = observer(({ children }) => {
  const { userStore } = useStore()
  const { authed, loading } = userStore
  const navigate = useNavigate()

  useEffect(() => {
    if (!authed) {
      toast.info("请登录账号")
      navigate("/login")
    }
  }, [])

  if (loading) {
    return <></>
  }

  return authed ? children : <Navigate replace to={"/"} />
})

export default RequireAuth
