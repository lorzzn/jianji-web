import { useStore } from "@/store"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth: FC<RequireAuthProps> = observer(({ children }) => {
  const { userStore } = useStore()
  const { authed, loading } = userStore

  useEffect(() => {
    if (!authed) {
      toast.info("请登录账号")
    }
  }, [])

  if (loading) {
    return <></>
  }

  return authed ? children : <Navigate replace to={"/login"} />
})

export default RequireAuth
