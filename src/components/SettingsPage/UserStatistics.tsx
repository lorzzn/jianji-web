import { apiUser } from "@/api/user"
import { useMotionValueState } from "@/hooks/useMotionValueState"
import errorHandler from "@/utils/errorHandler"
import { RiArticleLine, RiText } from "@remixicon/react"
import { animate } from "framer-motion"
import { useEffect, useState } from "react"
import ZLoadingContent from "../ZLoadingContent/ZLoadingContent"

const UserStatistics = () => {
  const [loading, setLoading] = useState(false)
  const [totalPosts, motionTotalPosts] = useMotionValueState(0)
  const [totalWords, motionTotalWords] = useMotionValueState(0)

  const getUserStatistics = async () => {
    setLoading(true)
    try {
      const res = await apiUser.statistics()
      const data = res.data.data
      animate(motionTotalPosts, data.totalPosts, { type: "keyframes" })
      animate(motionTotalWords, data.totalWords, { type: "keyframes" })
    } catch (error) {
      errorHandler.handle(error)
    }
    setLoading(false)
  }

  const intNumber = (num: number | string) => {
    return parseInt(String(num))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useEffect(() => {
    getUserStatistics()
  }, [])

  return (
    <div className="pt-3">
      <ZLoadingContent loading={loading}>
        <div className="flex items-center py-6">
          <div className="text-lg flex-1 flex flex-col justify-center items-center">
            <RiArticleLine />
            <div className="my-3">总文章数</div>
            <div>{intNumber(totalPosts)}</div>
          </div>

          <div className="text-lg flex-1 flex flex-col justify-center items-center">
            <RiText />
            <div className="my-3">总字数</div>
            <div>{intNumber(totalWords)}</div>
          </div>
        </div>
      </ZLoadingContent>
    </div>
  )
}

export default UserStatistics
