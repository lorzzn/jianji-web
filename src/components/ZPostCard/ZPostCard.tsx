import { IPost } from "@/api/types/response/posts"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiHashtag } from "@remixicon/react"
import { isEmpty } from "lodash"
import { FC } from "react"
import tw from "twin.macro"
import Category from "../ZPost/Category"
import Datetime from "../ZPost/Datetime"
import Tag from "../ZPost/Tag"

export interface ZPostCardProps {
  post: IPost
}

const ZPostCard: FC<ZPostCardProps> = ({ post }) => {
  return (
    <div className={twclx(["w-9/12 max-w-7xl py-12 border-b border-b-gray-200"])}>
      <div
        className={twclx([
          "transition-all",
          css`
            &:hover .title-mark {
              ${tw`text-gray-900`}
              &::before {
                ${tw`bg-blue-400`}
              }
            }
          `,
        ])}
      >
        <div className="w-full h-auto">
          {/* 标题 */}
          <a
            href={`/post/${post.uuid}`}
            className={twclx([
              "title-mark text-xl font-semibold text-gray-700 relative",
              css`
                &::before {
                  content: " ";
                  position: absolute;
                  padding: 1rem 0;
                  height: 100%;
                  width: 0.3rem;
                  left: -1rem;
                  ${tw`bg-gray-900`}
                }
              `,
            ])}
          >
            {post.title}
          </a>
        </div>
        {/* 创建日期和分类 */}
        <div className="flex items-center space-x-8 pt-6">
          {/* 发布日期 */}
          <Datetime post={post} />

          {/* 分类 */}
          {post.category && <Category category={post.category} />}
        </div>

        {/* 文章简要内容 */}
        {post.description && (
          <a href={`/post/${post.uuid}`} className="inline-block break-words max-h-[6em] overflow-hidden pt-6">
            <div className="text-gray-900">{post.description}</div>
          </a>
        )}
      </div>
      {/* 标签 */}
      {!isEmpty(post.tags) && (
        <div className="pt-6 relative space-x-2">
          <RiHashtag className="absolute my-1 -left-4" size={"1rem"} />
          {post.tags?.map((tag) => <Tag tag={tag} size={"small"} key={tag.value} />)}
        </div>
      )}
    </div>
  )
}

export default ZPostCard
