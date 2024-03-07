import { makeAutoObservable } from "mobx";
import { RiAlignJustify, RiArchiveLine, RiHashtag, RiHomeLine, RiStarLine } from '@remixicon/react'

class LayoutStore {
  width: number | undefined
  height: number | undefined
  focus: boolean | undefined
  layout: "large" | "medium" | "small"

  constructor() {
    this.layout = "large"
    makeAutoObservable(this)
  }

  nav = {
    items: [
      { href: "/", label: "首页", RiIcon: RiHomeLine },
      { href: "/archives", label: "归档", RiIcon: RiArchiveLine },
      { href: "/favlist", label: "收藏", RiIcon: RiStarLine },
      { href: "/categories", label: "分类", RiIcon: RiAlignJustify },
      { href: "/tags", label: "标签", RiIcon: RiHashtag },
    ]
  }

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

}

export default LayoutStore
