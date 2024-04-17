import { reactRootElement } from "@/main"
import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import useResizeObserver from "beautiful-react-hooks/useResizeObserver"
import { ComponentProps, forwardRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import tw from "twin.macro"

interface ZTocProps extends ComponentProps<"a"> {
  markdownContentRef: React.RefObject<HTMLDivElement>
}

const ZToc = forwardRef<HTMLDivElement, ZTocProps>((props, ref) => {
  const contentSize = useResizeObserver(props.markdownContentRef)
  const [rightWidth, setRightWidth] = useState(0)

  useEffect(() => {
    if (!props.markdownContentRef.current) return
    const markdownContent = props.markdownContentRef.current
    const rect = markdownContent.getBoundingClientRect()
    const distanceToRight = window.innerWidth - rect.right
    setRightWidth(distanceToRight)
  }, [contentSize])

  return createPortal(
    <div
      ref={ref}
      className={twclx([
        "prose fixed top-16 right-0 p-4 overflow-auto",
        css`
          width: ${rightWidth}px;
          height: calc(100vh - 64px);
          ul,
          li,
          ol {
            ${tw`list-none pl-2`}
          }
        `,
      ])}
    ></div>,
    reactRootElement,
  )
})

export default ZToc
