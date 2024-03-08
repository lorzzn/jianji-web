import { makeAutoObservable } from "mobx";
import { RiAlignJustify, RiArchiveLine, RiHashtag, RiHomeLine, RiStarLine } from '@remixicon/react'
import { Location } from "react-router-dom";
import { concat, takeRight } from "lodash";

export interface INavItem {
  href: string
  active?: boolean
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

  constructor() {
    this.layout = "large"
    makeAutoObservable(this)
  }

  navItems: INavItem[] = [
    { href: "/", label: "首页", RiIcon: RiHomeLine },
    { href: "/archives", label: "归档", RiIcon: RiArchiveLine },
    { href: "/favlist", label: "收藏", RiIcon: RiStarLine },
    { href: "/categories", label: "分类", RiIcon: RiAlignJustify },
    { href: "/tags", label: "标签", RiIcon: RiHashtag },
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
    this.navItems = this.navItems.map(item => {
      item.active = location.pathname === item.href.split("?")[0]
      return item
    })
  }

  updateClickTrace = (elem: Element) => {
    this.clickTrace = takeRight(concat(this.clickTrace, elem), 50)
  }

}

export default LayoutStore
