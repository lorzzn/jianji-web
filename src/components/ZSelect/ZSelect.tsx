import { css } from "@emotion/css"
import { RiArrowDropRightFill } from "@remixicon/react"
import classNames from "classnames"
import { FC } from "react"
import Select, { OptionProps, Props } from "react-select"
import { twMerge } from "tailwind-merge"

export interface TreeOptionsItem {
  id: string | number
  parentId?: string | number
  name: string
}

export type TreeOptions = TreeOptionsItem[]

export interface ZSelectProps extends Props {
  isTree?: boolean
}

const ZSelect: FC<ZSelectProps> = ({ components, isTree, value, ...restProps }) => {
  const TreeOption = (option: OptionProps<any>) => {
    const { data, theme } = option
    const PropOptionComponent = components?.Option
    if (PropOptionComponent) {
      return <PropOptionComponent {...option} />
    }

    return (
      <div
        className={twMerge(
          classNames([
            `flex items-center h-8 cursor-pointer`,
            css`
              &:hover {
                background-color: ${theme.colors.primary25};
              }
            `,
          ]),
        )}
      >
        <RiArrowDropRightFill />
        <p>{data?.name}</p>
        <p>{theme.colors.primary}</p>
      </div>
    )
  }

  return (
    <Select
      components={{
        ...components,
        Option: isTree ? TreeOption : components?.Option,
      }}
      {...restProps}
    />
  )
}

export default ZSelect
