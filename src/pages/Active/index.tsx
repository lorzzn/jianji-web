import ZLoading from "@/components/ZLoading/ZLoading"
import { useStore } from "@/store"
import { isNull, some, values } from "lodash"
import { observer } from "mobx-react"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Active: FC = observer(() => {
  const query = new URLSearchParams(window.location.search)
  const navigate = useNavigate()
  const { userStore } = useStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const params = {
    email: query.get("email"),
    state: query.get("state"),
  }

  const activeAccount = async () => {
    try {
      await userStore.activeUser(params as any)
      setSuccess(true)
      toast.success("账号激活成功")
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (error) {
      //
    }
    setLoading(false)
  }

  useEffect(() => {
    if (some(values(params), isNull)) {
      navigate("/")
    } else {
      setLoading(true)
      activeAccount()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-gray-500">
        {loading && <ZLoading />}
        {loading && <div>正在激活您的账号...</div>}
        {success && <div>激活成功</div>}
      </div>
    </div>
  )
})

export default Active
