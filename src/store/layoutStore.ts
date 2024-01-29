import { makeAutoObservable } from "mobx";
import { RiAlignJustify, RiArchiveLine, RiHashtag, RiHomeLine, RiStarLine } from '@remixicon/react'

class LayoutStore {
  constructor() {
    makeAutoObservable(this)
  }

  nav = {
    items: [
      { href: "/", label: "首页", RiIcon: RiHomeLine },
      { href: "/", label: "归档", RiIcon: RiArchiveLine },
      { href: "/", label: "收藏", RiIcon: RiStarLine },
      { href: "/", label: "分类", RiIcon: RiAlignJustify },
      { href: "/", label: "标签", RiIcon: RiHashtag },
    ]
  }

}

export default LayoutStore
