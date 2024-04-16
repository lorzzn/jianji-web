import ConfirmAbleButton from "@/components/ConfirmAbleButton/ConfirmAbleButton"
import HoverFloating from "@/components/ZAnimateDiv/HoverFloating"
import ZButton from "@/components/ZButton/ZButton"
import Preview from "@/components/ZPost/Preview"
import Tag from "@/components/ZPost/Tag"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "@/components/ZTooltip/ZTooltip"
import { useStore } from "@/store"
import { dateFormat } from "@/utils/dateFormat"
import { uuidjs } from "@/utils/uuid"
import { RiCalendarLine, RiHashtag, RiStackLine } from "@remixicon/react"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Post = observer(() => {
  const { postStore } = useStore()
  const {
    postInfo: post,
    deletePost,
    getFromRemote
  } = postStore
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const { uuid: uuidparam } = useParams()
  
  const navigate = useNavigate()

  const goEdit = () => {
    navigate(`/edit/${uuidparam}`)
  }

  const onDelete = async () => {
    setDeleteLoading(true)
    try {
      await deletePost()
      setDeleted(true)
    } finally {
      toast.success("删除成功")
      window.location.href = "/"
    }
    setDeleteLoading(false)
  }

  useEffect(() => {
    if (uuidparam && uuidjs.validate(uuidparam)) {
      getFromRemote(uuidparam)
    } else { 
      // 404
      navigate("/404", {
        replace: true
      })
    }
  }, [ uuidparam ])

  return <div className="mt-12 flex justify-center items-center">
    <div className="w-7/12 max-w-7xl">
      <div className="text-center font-semibold text-3xl text-gray-700">{post.title}</div>

      {/* 创建日期和分类 */}
      <div className="flex items-center space-x-8 pt-6 pb-3">
        {/* 发布日期 */}
        <ZTooltip>
          <ZTooltipTrigger>
            <div className="flex items-center text-gray-600 space-x-2">
              <RiCalendarLine size={"1rem"} />
              <div>{dateFormat(post.createdAt)}</div>
            </div>
          </ZTooltipTrigger>
          <ZTooltipContent>
            <div>创建时间：{dateFormat(post.createdAt)}</div>
            {
              post.updatedAt !== post.createdAt && <div>最近编辑时间：{dateFormat(post.updatedAt)}</div>
            }
          </ZTooltipContent>
        </ZTooltip>

        {/* 分类 */}
        {
          post.category && <HoverFloating className="flex items-center text-gray-600 space-x-2 cursor-pointer select-none">
            <RiStackLine size={"1rem"} />
            <div>{post.category?.label}</div>
          </HoverFloating>
        }

        <div className="flex items-center">
          <ZButton variant={"primary_plain"} className="h-6" onClick={goEdit}>编辑</ZButton>
          <ConfirmAbleButton text="删除" confirmText="确认删除？" onConfirm={onDelete} buttonProps={{
            loading: deleteLoading,
            disabled: deleted,
            className: "h-6"
          }} />
        </div>
      </div>

      {/* 标签 */}
      <div className="pb-6">
        {
          !isEmpty(post.tags) && <div className="space-x-2">
            <RiHashtag className="inline-block my-1 -left-4" size={"1rem"} />
            {
              post.tags?.map(tag => <Tag tag={tag} size={"small"} key={tag.value} />)
            }
          </div>
        }
      </div>

      {/* 文章内容 */}
      <div className="break-words">
        <Preview>{post.content}</Preview>
      </div>
    </div>
  </div>
})

export default Post
