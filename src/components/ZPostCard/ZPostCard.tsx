import { IPost } from "@/api/types/response/posts"
import { dateFormat } from "@/utils/dateFormat"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { RiCalendarLine, RiHashtag, RiStackLine } from "@remixicon/react"
import { isEmpty } from "lodash"
import { FC } from "react"
import tw from "twin.macro"
import HoverFloating from "../ZAnimateDiv/HoverFloating"
import { ZTooltip, ZTooltipContent, ZTooltipTrigger } from "../ZTooltip/ZTooltip"
import Tag from "../ZPost/Tag"

export interface ZPostCardProps {
  post: IPost
}

const ZPostCard: FC<ZPostCardProps> = ({ post }) => {
  return (
    <div className={twclx(["w-9/12 max-w-7xl py-12 border-b border-b-gray-200"])}>
      <a
        href={`/post/${post.uuid}`}
        className={twclx([
          "rounded cursor-pointer transition-all",
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
        <div className="flex items-center space-x-8 pt-6">
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
          {post.category && (
            <HoverFloating className="flex items-center text-gray-600 space-x-2 cursor-pointer select-none">
              <RiStackLine size={"1rem"} />
              <div>{post.category?.label}</div>
            </HoverFloating>
          )}
        </div>

        {/* 文章简要内容 */}
        {
          post.description && <div className="break-words max-h-[6em] overflow-hidden pt-6">
            <div className="text-gray-900">{post.description}</div>
          </div>
        }
      </a>
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
