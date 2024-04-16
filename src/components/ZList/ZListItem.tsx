import { twclx } from "@/utils/twclx"
import { FC, ReactNode } from "react"

interface ZListItemProps extends React.InputHTMLAttributes<HTMLDivElement> {
  prefixNode?: ReactNode
  children?: ReactNode
  suffixNode?: ReactNode
}

const ZListItem: FC<ZListItemProps> = (props) => {
  return (
    <div className={twclx(["z-list-item w-full flex items-center", props.className])}>
      {props.prefixNode}
      <div className="flex-1">{props.children}</div>
      {props.suffixNode}
    </div>
  )
}

export default ZListItem
