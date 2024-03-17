import { twclx } from "@/utils/twclx"
import { FC } from "react"
import Markdown, { Options } from "react-markdown"

interface PreviewProps extends Options {}

const Preview: FC<PreviewProps> = ({ className, ...restProps }) => {
  return <Markdown className={twclx(["prose", className])} {...restProps} />
}

export default Preview
