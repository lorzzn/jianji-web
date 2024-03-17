import classNames from "classnames"
import { FC } from "react"
import Markdown, { Options } from "react-markdown"
import { twMerge } from "tailwind-merge"

interface PreviewProps extends Options {}

const Preview: FC<PreviewProps> = ({ className, ...restProps }) => {
  return <Markdown className={twMerge(classNames(["prose", className]))} {...restProps} />
}

export default Preview
