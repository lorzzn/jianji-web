import { IPost } from "@/api/types/response/posts"
import { dateFormat } from "@/utils/dateFormat"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiCalendarLine, RiHashtag, RiStackLine } from "@remixicon/react"
import { isEmpty } from "lodash"
import { FC } from "react"
import tw from "twin.macro"
import HoverFloating from "../ZAnimateDiv/HoverFloating"

export interface ZPostCardProps {
  post: IPost
}

const ZPostCard: FC<ZPostCardProps> = ({ post }) => {
  return (
    <div className={twclx(["w-9/12 max-w-7xl py-12 border-b border-b-gray-200"])}>
      <a
        href={`/post/${post.uuid}`}
        className={twclx([
          "rounded cursor-pointer p-6 transition-all",
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
        <div className="w-full h-auto rounded">
          {/* 标题 */}
          <div
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
          </div>
        </div>
        {/* 创建日期和分类 */}
        <div className="flex items-center space-x-8">
          {/* 发布日期 */}
          <div className="flex items-center py-6 text-gray-600 space-x-2">
            <RiCalendarLine size={"1rem"} />
            <div>{dateFormat(post.createdAt)}</div>
          </div>

          {/* 分类 */}
          {post.category && (
            <HoverFloating className="flex items-center py-6 text-gray-600 space-x-2 cursor-pointer select-none">
              <RiStackLine size={"1rem"} />
              <div>{post.category?.label}</div>
            </HoverFloating>
          )}
        </div>

        {/* 文章简要内容 */}
        <div className="break-words max-h-[6em] overflow-hidden">
          <div className="text-gray-900">{post.description}</div>
        </div>

        {/* 标签 */}
        {!isEmpty(post.tags) && (
          <div className="pt-6 relative space-x-2">
            <RiHashtag className="absolute my-1 -left-4" size={"1rem"} />
            {post.tags?.map((tag) => {
              return (
                <HoverFloating
                  key={tag.value}
                  className="rounded-full bg-gray-800 text-white px-2 py-0.5 text-xs inline-block select-none"
                >
                  {tag.label}
                </HoverFloating>
              )
            })}
          </div>
        )}
      </a>
    </div>
  )
}

export default ZPostCard
