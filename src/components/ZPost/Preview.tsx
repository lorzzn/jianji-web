import { twclx } from "@/utils/twclx"
import MarkdownIt from "markdown-it"
import { CSSProperties, FC } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps {
  className?: string
  style?: CSSProperties
  children?: string
  prose?: boolean
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(injectLineNumbers)

const Preview: FC<PreviewProps> = ({ className, style, prose = true, children = "" }) => {
  return (
    <div
      style={style}
      className={twclx(["max-w-full", { prose: prose }], className)}
      dangerouslySetInnerHTML={{ __html: md.render(children) }}
    ></div>
  )
}

export default Preview
