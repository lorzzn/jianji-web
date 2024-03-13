import { CSSProperties, FC, ReactNode } from "react"
import classNames from "classnames"
import { omit } from "lodash"

export interface INavItem {
  value: any
  label: ReactNode
  active?: boolean
  style?: CSSProperties
  className?: string
  activable?: boolean
}

interface NavItemProps extends INavItem {
  onClick: (data: INavItem) => void
}

const NavItem:FC<NavItemProps> = (props) => {
  const { label, active, style, className, onClick } = props

  const handleClick = () => {
    onClick?.(omit(props, "onClick"))
  }

  return <button
    className={classNames(["w-36 h-12 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200", { "text-blue-500 bg-gray-100": active }, className])}
    style={style}
    onClick={handleClick}
  >
    {label}
  </button>
}

export default NavItem
