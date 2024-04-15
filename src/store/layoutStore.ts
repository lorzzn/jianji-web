import { RiArchiveLine, RiHashtag, RiHomeLine, RiStackLine, RiStarLine } from "@remixicon/react"
import { concat, takeRight } from "lodash"
import { makeAutoObservable } from "mobx"
import { Location } from "react-router-dom"

export interface INavItem {
  href: string
  active?: boolean
  activePath?: string[] | string
  label: string
  RiIcon: typeof RiHomeLine
}

class LayoutStore {
  width: number | undefined
  height: number | undefined
  focus: boolean | undefined
  layout: "large" | "medium" | "small"
  location: Location | undefined
  clickTrace: Element[] = []
  scrollTop: number  = 0

  constructor() {
    this.layout = "large"
    makeAutoObservable(this)
  }

  navItems: INavItem[] = [
    { href: "/", label: "首页", RiIcon: RiHomeLine },
    { href: "/archives", label: "归档", RiIcon: RiArchiveLine },
    { href: "/favlist", label: "收藏", RiIcon: RiStarLine },
    { href: "/categories", label: "分类", RiIcon: RiStackLine },
    { href: "/tags", label: "标签", RiIcon: RiHashtag, activePath: ["tags", "tag"] },
  ]

  updateLayoutState = (width: number, height: number, focus: boolean) => {
    this.width = width
    this.height = height
    this.focus = focus
    if (width > 1280) {
      this.layout = "large"
    } else if (width > 960) {
      this.layout = "medium"
    } else {
      this.layout = "small"
    }
  }

  updateLocationState = (location: Location) => {
    this.location = location
    this.navItems = this.navItems.map((item) => {
      item.active = false
      if (Array.isArray(item.activePath)) {
        item.activePath.forEach((path) => item.active ||= location.pathname.split("/")[1] === path)
      } else {
        item.active ||= location.pathname === (item.activePath || item.href)
      }
      return item
    })
  }

  updateClickTrace = (elem: Element) => {
    this.clickTrace = takeRight(concat(this.clickTrace, elem), 50)
  }
  
  updateScrollTop = (scrollTop: number) => {
    this.scrollTop = scrollTop
  }

}

export default LayoutStore
