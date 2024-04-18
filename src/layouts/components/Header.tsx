import ZButton from "@/components/ZButton/ZButton"
import ZImage from "@/components/ZImage/ZImage"
import { useStore } from "@/store"
import { twclx } from "@/utils/twclx"
import { RiPenNibLine, RiSearchLine } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC } from "react"
import UserInfo from "./UserInfo"

const Header: FC = observer(() => {
  const { userStore, layoutStore } = useStore()
  const { loading: userInfoLoading } = userStore
  const { layout, location, navItems } = layoutStore

  const searchButtonActive = location?.pathname === "/search"
  const penButtonActive = ["/edit"].includes(location?.pathname ?? "")

  return (
    <header className="h-14 flex items-center justify-between border-b shadow-sm px-8 sticky top-0 bg-white z-[500]">
      <div className="flex items-center">
        <a href="/" className="flex justify-center w-24 mr-6">
          <ZImage className="w-full h-full" src="!/logo.png" />
        </a>

        <div className="flex items-center justify-center w-full whitespace-nowrap">
          <div className="flex space-x-3 w-full justify-center items-center">
            {navItems.map((item) => (
              <ZButton
                variant={"primary_plain"}
                className={twclx(["text-base text-black hover:text-blue-600", { "text-blue-700": item.active }])}
                key={item.href}
                componentTag="a"
                href={item.href}
              >
                {layout !== "small" && <item.RiIcon className="w-4 mr-2" />}
                {item.label}
              </ZButton>
            ))}
          </div>
        </div>
      </div>

      {!userInfoLoading && (
        <div className="flex items-center">
          <div className="mx-6 flex items-center flex-nowrap whitespace-nowrap">
            <ZButton
              variant={"primary_plain"}
              className={classNames(["text-black hover:bg-blue-50 space-x-1", { "text-blue-700": searchButtonActive }])}
              componentTag="a"
              href={"/search"}
            >
              <RiSearchLine size={"1.1rem"} />
              {layout !== "small" && <span>搜索</span>}
            </ZButton>
            <ZButton
              variant={"primary_plain"}
              className={classNames(["text-black hover:bg-blue-50 space-x-1", { "text-blue-700": penButtonActive }])}
              componentTag="a"
              href={"/edit"}
            >
              <RiPenNibLine size={"1.1rem"} />
              {layout !== "small" && <span>写笔记</span>}
            </ZButton>
          </div>

          <UserInfo />
        </div>
      )}
    </header>
  )
})

export default Header
