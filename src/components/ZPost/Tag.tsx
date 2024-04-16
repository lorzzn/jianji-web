import { ITag } from "@/api/types/response/tags"
import { FC } from "react"
import HoverFloating from "../ZAnimateDiv/HoverFloating"
import { VariantProps, cva } from "class-variance-authority"
import { twclx } from "@/utils/twclx"
import ZButton from "../ZButton/ZButton"
import { RiHashtag } from "@remixicon/react"
import { stopPropagation } from "@/utils/tools"

const tagVariants = cva(
  twclx(["rounded-full bg-gray-800 text-white h-auto"]),
  {
    variants: {
      size: {
        small: "px-2 py-0.5 text-xs",
        normal: "px-5 py-2",
      }
    },
    defaultVariants: {
      size: "normal"
    }
  }
)

interface TagProps extends VariantProps<typeof tagVariants> {
  tag: ITag 
  className?: string
}

const Tag:FC<TagProps> = ({ tag, size, className }) => {

  return <HoverFloating 
    className={twclx(["inline-block select-none", className])}
  >
    <ZButton 
      variant={"primary_plain"} 
      className={tagVariants({ size })}
      componentTag="a"
      onClick={stopPropagation}
      href={`/tag/${tag.value}`}
    >
      {size === "normal" && <RiHashtag size={"1.2rem"} />}
      <span>{tag.label}</span>
    </ZButton>
  </HoverFloating>
}

export default Tag
