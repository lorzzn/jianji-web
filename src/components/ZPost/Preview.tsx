import { twclx } from "@/utils/twclx"
import MarkdownIt from "markdown-it"
import { CSSProperties, forwardRef } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
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

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ className, style, prose = true, children = "", ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={twclx(["max-w-full", { prose: prose }], className)}
        dangerouslySetInnerHTML={{ __html: md.render(children) }}
        {...restProps}
      ></div>
    )
  },
)

export default Preview
