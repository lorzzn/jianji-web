import { IPost } from "@/api/types/response/posts"
import { dateFormat } from "@/utils/dateFormat"
import { RiCalendarLine } from "@remixicon/react"
import { FC } from "react"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "../ZTooltip/ZTooltip"

interface DatetimeProps {
  post: IPost
}

const Datetime: FC<DatetimeProps> = ({ post }) => {
  return (
    <ZTooltip>
      <ZTooltipTrigger>
        <div className="flex items-center text-gray-600 space-x-2 whitespace-nowrap">
          <RiCalendarLine size={"1rem"} className="shrink-0" />
          <div>{dateFormat(post.createdAt)}</div>
        </div>
      </ZTooltipTrigger>
      <ZTooltipContent>
        <div>创建时间：{dateFormat(post.createdAt)}</div>
        {post.updatedAt !== post.createdAt && <div>最近编辑时间：{dateFormat(post.updatedAt)}</div>}
      </ZTooltipContent>
    </ZTooltip>
  )
}

export default Datetime
