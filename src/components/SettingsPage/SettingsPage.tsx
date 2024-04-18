import { isNil, omit } from "lodash"
import { FC, ReactNode, useState } from "react"
import Nav from "./Nav"
import NavItem, { INavItem } from "./NavItem"

interface SettingsPageProps {
  nav: INavItem[]
  defaultNavIndex?: number
  onChange?: (nav: INavItem) => void
  onClick?: (nav: INavItem) => void
  contentRender?: (nav: INavItem | undefined) => ReactNode
}

const SettingsPage: FC<SettingsPageProps> = ({ nav, defaultNavIndex, onChange, onClick, contentRender }) => {
  const [activeValue, setActiveValue] = useState<INavItem | undefined>(
    isNil(defaultNavIndex) ? undefined : nav[defaultNavIndex],
  )

  const onNavItemClick = (item: INavItem) => {
    item = omit(item, "active")
    onClick?.(item)
    if (activeValue !== item.value && item.activable !== false) {
      setActiveValue(item)
      onChange?.(item)
    }
  }

  return (
    <div className="flex flex-row h-full w-full">
      <Nav>
        {nav.map((item) => {
          return (
            <NavItem {...item} onClick={onNavItemClick} active={item.value === activeValue?.value} key={item.value} />
          )
        })}
      </Nav>

      <div className="flex-1">{contentRender?.(activeValue)}</div>
    </div>
  )
}

export default SettingsPage
