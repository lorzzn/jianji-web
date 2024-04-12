import { twclx } from "@/utils/twclx"
import { RiBallPenLine, RiEyeLine, RiFullscreenExitLine, RiFullscreenLine, RiLayoutColumnFill } from "@remixicon/react"
import classNames from "classnames"
import { FC, useMemo } from "react"

export interface ToolbarButton {
  title: string
  icon?: JSX.Element
  active?: boolean
  layout?: string
  className?: string
  action?: string
}

interface ToolbarProps {
  layout: string
  fullscreen: boolean
  onClick: (info: ToolbarButton, event: React.MouseEvent<HTMLButtonElement>) => void
}

const Toolbar: FC<ToolbarProps> = ({ layout, fullscreen, onClick }) => {
  const buttons = useMemo<ToolbarButton[]>(() => {
    return [
      {
        icon: <RiLayoutColumnFill size={"1.1rem"} className={classNames([{ "rotate-z-180": layout === "reverse" }])} />,
        title: "布局",
        active: layout === "normal" || layout === "reverse",
        layout: layout === "normal" ? "reverse" : "normal",
      },
      {
        icon: <RiBallPenLine size={"1.1rem"} />,
        title: "编辑器",
        active: layout === "editor",
        layout: "editor",
      },
      {
        icon: <RiEyeLine size={"1.1rem"} />,
        title: "预览",
        active: layout === "preview",
        layout: "preview",
      },
      {
        className: "ml-auto",
        title: "帮助",
        action: "help",
      },
      {
        icon: fullscreen ? <RiFullscreenExitLine size={"1.1rem"} /> : <RiFullscreenLine size={"1.1rem"} />,
        title: "全屏",
        action: "fullscreen",
      },
    ]
  }, [layout, fullscreen])

  const onButtonClick = (info: ToolbarButton, event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(info, event)
  }

  return (
    <div className="flex w-full">
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            className={twclx([
              "flex justify-center items-center px-3 py-2 space-x-1 hover:bg-gray-200",
              { "bg-gray-200": button.active },
              button.className,
            ])}
            onClick={(e) => onButtonClick(button, e)}
          >
            {button.icon}
            <span>{button.title}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Toolbar
