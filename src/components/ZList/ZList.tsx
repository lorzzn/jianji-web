import { twclx } from "@/utils/twclx"
import { css } from "@emotion/css"
import { FC } from "react"
import tw from "twin.macro"

interface ZListProps extends React.InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ZList: FC<ZListProps> = (props) => {
  return (
    <div
      className={twclx([
        "z-list flex flex-col",
        css`
          .z-list-item:nth-child(odd) {
            ${tw`bg-gray-100`}
          }
        `,
        props.className,
      ])}
    >
      {props.children}
    </div>
  )
}

export default ZList
