import { makeAutoObservable } from "mobx";
import { RiAlignJustify, RiArchiveLine, RiHashtag, RiHomeLine, RiStarLine } from '@remixicon/react'

class LayoutStore {
  constructor() {
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

}

export default LayoutStore
