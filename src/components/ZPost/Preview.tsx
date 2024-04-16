import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import hljs from "highlight.js"
import MarkdownIt from "markdown-it"
import { CSSProperties, forwardRef } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: CSSProperties
  children?: string
  prose?: boolean
}

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          `<pre><code class="hljs language-${lang}">` +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        )
      } catch (__) {
        // ignore
      }
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
  },
}).use(injectLineNumbers)

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ className, style, prose = true, children = "", ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={twclx(
          [
            "max-w-full",
            { prose: prose },
            css`
              pre {
                padding: 0;
              }
            `,
          ],
          className,
        )}
        dangerouslySetInnerHTML={{ __html: md.render(children) }}
        {...restProps}
      ></div>
    )
  },
)

export default Preview
