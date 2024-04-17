import ConfirmAbleButton from "@/components/ConfirmAbleButton/ConfirmAbleButton"
import ZButton from "@/components/ZButton/ZButton"
import Category from "@/components/ZPost/Category"
import Datetime from "@/components/ZPost/Datetime"
import Preview from "@/components/ZPost/Preview"
import Tag from "@/components/ZPost/Tag"
import { useStore } from "@/store"
import { uuidjs } from "@/utils/uuid"
import { RiHashtag } from "@remixicon/react"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Post = observer(() => {
  const { postStore } = useStore()
  const { postInfo: post, deletePost, getFromRemote } = postStore
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const { uuid: uuidparam } = useParams()

  const navigate = useNavigate()

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
        replace: true,
      })
    }
  }, [uuidparam])

  return (
    <div className="mt-12 flex justify-center items-center">
      <div className="w-5/12 min-w-[550px]">
        <div className="text-center font-semibold text-3xl text-gray-700">{post.title}</div>

        {/* 创建日期和分类 */}
        <div className="flex items-center space-x-8 pt-6 pb-3">
          {/* 发布日期 */}
          <Datetime post={post} />

          {/* 分类 */}
          {post.category && <Category category={post.category} />}

          <div className="flex items-center whitespace-nowrap">
            <ZButton variant={"primary_plain"} className="h-6" componentTag="a" href={`/edit/${uuidparam}`}>
              编辑
            </ZButton>
            <ConfirmAbleButton
              text="删除"
              confirmText="确认删除？"
              onConfirm={onDelete}
              buttonProps={{
                loading: deleteLoading,
                disabled: deleted,
                className: "h-6",
              }}
            />
          </div>
        </div>

        {/* 标签 */}
        <div className="pb-6">
          {!isEmpty(post.tags) && (
            <div className="space-x-2">
              <RiHashtag className="inline-block my-1 -left-4" size={"1rem"} />
              {post.tags?.map((tag) => <Tag tag={tag} size={"small"} key={tag.value} />)}
            </div>
          )}
        </div>

        {/* 文章内容 */}
        <div className="break-words">
          <Preview anchor toc>
            {post.content}
          </Preview>
        </div>
      </div>
    </div>
  )
})

export default Post
