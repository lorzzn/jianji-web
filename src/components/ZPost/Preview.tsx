import errorHandler from "@/utils/errorHandler"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import hljs from "highlight.js"
import MarkdownIt from "markdown-it"
import mdAnchor from "markdown-it-anchor"
import mdToc from "markdown-it-toc-done-right"
import { CSSProperties, forwardRef, useEffect, useMemo } from "react"
import { injectLineNumbers } from "./utils/injectLineNumbers"

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: CSSProperties
  children?: string
  prose?: boolean
  anchor?: boolean
  toc?: boolean
  tocContainerRef?: React.RefObject<HTMLDivElement>
}

const createBaseMd = () => {
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
        } catch (error) {
          errorHandler.handle(error)
        }
      }

      return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
    },
  }).use(injectLineNumbers)

  return md
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ className, style, prose = true, children = "", anchor, toc, tocContainerRef, ...restProps }, ref) => {
    const anchorOptions = {
      permalink: mdAnchor.permalink.headerLink({
        symbol: "#",
      }),
    }

    const md = useMemo<MarkdownIt>(() => {
      const instance = createBaseMd()
      if (anchor) {
        instance.use(mdAnchor, anchorOptions)
      }
      return instance
    }, [anchor, toc])

    useEffect(() => {
      if (!tocContainerRef?.current) return
      const tocContainer = tocContainerRef.current

      if (toc) {
        md.use(mdToc, {
          containerClass: "toc",
          containerId: "toc",
          listType: "ol",
          listClass: "catalog-list",
          linkClass: "catalog-link",
          callback: function (html: any) {
            if (html) {
              tocContainer.innerHTML = html
            }
          },
        })
      } else {
        tocContainer.innerHTML = ""
      }
    }, [toc])

    return (
      <div className="flex-1">
        <div
          ref={ref}
          style={style}
          className={twclx(
            [
              "max-w-full",
              { prose: prose },
              css`
                .hljs {
                  background-color: transparent;
                  padding: 0;
                }
              `,
            ],
            className,
          )}
          dangerouslySetInnerHTML={{ __html: md.render(children) }}
          {...restProps}
        ></div>
      </div>
    )
  },
)

export default Preview
