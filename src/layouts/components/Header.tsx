import ZButton from "@/components/ZButton/ZButton"
import ZImage from "@/components/ZImage/ZImage"
import { useStore } from "@/store"
import { RiPenNibLine, RiSearchLine } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import UserInfo from "./UserInfo"


const Header: FC = observer(() => {
  const navigate = useNavigate()
  const { userStore, layoutStore, postStore } = useStore()
  const {
    loading: userInfoLoading,
  } = userStore
  const {
    layout,
    location,
    navItems,
  } = layoutStore
  const {
    setUuid
  } = postStore

  const searchButtonActive = location?.pathname === "/search"
  const penButtonActive = ["/edit"].includes(location?.pathname ?? "")

  const onMenuItemClick = (item: (typeof navItems)[0]) => {
    if (item.href) {
      navigate(item.href)
    }
  }

  const onSearchClick = () => {
    if (!searchButtonActive) {
      navigate("/search")
    }
  }

  const onPenButtonClick = () => {
    if (!penButtonActive) {
      setUuid(null)
      navigate("/edit")
    }
  }

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
                className={classNames(["text-base", { "text-black": !item.active }])}
                key={item.href}
                onClick={() => onMenuItemClick(item)}
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
              className={classNames(["text-black hover:bg-blue-50 space-x-1", { "text-blue-500": searchButtonActive }])}
              onClick={onSearchClick}
            >
              <RiSearchLine size={"1.1rem"} />
              {layout !== "small" && <span>搜索</span>}
            </ZButton>
            <ZButton
              variant={"primary_plain"}
              className={classNames(["text-black hover:bg-blue-50 space-x-1", { "text-blue-500": penButtonActive }])}
              onClick={onPenButtonClick}
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
