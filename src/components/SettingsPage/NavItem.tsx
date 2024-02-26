import { FC, ReactNode } from "react"
import classNames from "classnames"

export interface INavItem {
  value: any
  label: ReactNode
  active?: boolean
}

interface NavItemProps extends INavItem {
  onClick: (data: INavItem) => void
}

const NavItem:FC<NavItemProps> = ({ value, label, active, onClick }) => {

  const handleClick = () => {
    onClick?.({ value, label, active })

  }

  return <button
    className={classNames(["w-36 h-12 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200", { "text-blue-500 bg-gray-100": active }])}
    onClick={handleClick}
  >
    {label}
  </button>
}

export default NavItem
