import { reactRootElement } from "@/main"
import { randomString } from "@/utils/stringFuncs"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import useMutableState from "beautiful-react-hooks/useMutableState"
import useResizeObserver from "beautiful-react-hooks/useResizeObserver"
import useWindowScroll from "beautiful-react-hooks/useWindowScroll"
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import tw from "twin.macro"

interface ZTocProps extends ComponentProps<"a"> {
  markdownContentRef: React.RefObject<HTMLDivElement>
}

const ZToc = forwardRef<HTMLDivElement, ZTocProps>((props, ref) => {
  const contentSize = useResizeObserver(props.markdownContentRef)
  const [rightWidth, setRightWidth] = useState(0)
  const onWindowScroll = useWindowScroll()
  const headings = useRef<HTMLHeadingElement[]>([])
  const scrollMap = useRef<{ id: string; top: number; bottom: number }[]>()
  const tocId = useMutableState({ value: "toc-wrapper-" + randomString(8) })

  const buildScrollMap = () => {
    // 获取markdown内容里所有标题元素
    headings.current = props.markdownContentRef.current?.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    ) as unknown as HTMLHeadingElement[]
    if (!headings.current) return []

    return Array.from(headings.current).map((heading, index) => ({
      id: heading.id,
      top: heading.offsetTop,
      bottom: heading.offsetTop + headings.current[index + 1]?.offsetTop || Infinity,
    }))
  }

  onWindowScroll(() => {
    if (!props.markdownContentRef.current) return
    // 加上的数值是内容距离页面顶部的间距，要加上用来修复目录对不准确的问题
    const scrollY = window.scrollY + 100
    if (!scrollMap.current) scrollMap.current = buildScrollMap()

    let activeHeading = ""
    for (let i = 0; i < scrollMap.current.length; i++) {
      const position = scrollMap.current[i]
      if (scrollY >= position.top && scrollY < position.bottom) {
        activeHeading = position.id
      }
    }

    const tocItems = document
      .getElementById(tocId.value)
      ?.querySelectorAll(".catalog-link") as unknown as HTMLAnchorElement[]

    tocItems?.forEach((item) => {
      if (String(item.innerText).replace(/\s+/g, "-").toLowerCase() === activeHeading) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  })

  useEffect(() => {
    if (!props.markdownContentRef.current) return
    const markdownContent = props.markdownContentRef.current
    const rect = markdownContent.getBoundingClientRect()
    const distanceToRight = window.innerWidth - rect.right
    setRightWidth(distanceToRight)

    scrollMap.current = buildScrollMap()
  }, [contentSize])

  return createPortal(
    <div
      ref={ref}
      id={tocId.value}
      className={twclx([
        "z-markdown-toc prose fixed top-16 right-0 pl-12 pt-12 pr-4 pb-4 overflow-auto ",
        css`
          width: ${rightWidth}px;
          height: calc(100vh - 64px);
          ul,
          li,
          ol {
            ${tw`list-none pl-1 m-0`}
            a.catalog-link {
              ${tw`no-underline hover:underline hover:text-gray-600 hover:bg-gray-200 hover:bg-opacity-80 rounded p-1`}
              &.active {
                ${tw`bg-gray-200 bg-opacity-80`}
              }
            }
          }
          @media (max-width: 1290px) {
            display: none;
          }
        `,
      ])}
    ></div>,
    reactRootElement,
  )
})

export default ZToc
