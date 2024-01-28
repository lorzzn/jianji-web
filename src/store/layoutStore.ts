import { makeAutoObservable } from "mobx";

class LayoutStore {
  constructor() {
    makeAutoObservable(this)
  }

  sider = {
    menu: {
      items: [
        { href: "/", label: "首页" },
        { href: "/", label: "归档" },
        { href: "/", label: "分类" },
        { href: "/", label: "标签" },
        { href: "/", label: "相册" },
        { href: "/", label: "友链" },
        { href: "/", label: "关于" },
      ]
    }
  }

}

export default LayoutStore
