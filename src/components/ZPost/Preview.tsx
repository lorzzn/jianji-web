import { twclx } from "@/utils/twclx"
import MarkdownIt from "markdown-it"
import { CSSProperties, FC } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps {
  className?: string
  style?: CSSProperties
  children?: string
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(injectLineNumbers)

const Preview: FC<PreviewProps> = ({ className, style, children = "" }) => {
  return (
    <div
      style={style}
      className={twclx("prose max-w-full overflow-y-auto", className)}
      dangerouslySetInnerHTML={{ __html: md.render(children) }}
    ></div>
  )
}

export default Preview
