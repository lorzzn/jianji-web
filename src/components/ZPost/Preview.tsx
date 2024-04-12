import { twclx } from "@/utils/twclx"
import MarkdownIt from "markdown-it"
import { FC } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps {
  className?: string
  children?: string
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(injectLineNumbers)

const Preview: FC<PreviewProps> = ({ className, children = "" }) => {
  return (
    <div
      className={twclx("prose max-w-full overflow-y-auto", className)}
      dangerouslySetInnerHTML={{ __html: md.render(children) }}
    ></div>
  )
}

export default Preview
