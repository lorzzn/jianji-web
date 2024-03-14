import ZButton, { ZButtonVariants } from "@/components/ZButton/ZButton"
import ZDropdown, { DropdownOption } from "@/components/ZDropdown/ZDropdown"
import ZImage from "@/components/ZImage/ZImage"
import { useStore } from "@/store"
import { RiAddLine, RiArrowDownSFill, RiSearchLine } from "@remixicon/react"
import classNames from "classnames"
import { observer } from "mobx-react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import UserInfo from "./UserInfo"

const dropdownOptions: DropdownOption[] = [
  { label: "文章", value: "0" },
  { label: "分类", value: "1" },
  { label: "标签", value: "2" },
]

const Header: FC = observer(() => {
  const navigate = useNavigate()
  const { userStore, layoutStore } = useStore()
  const userInfoLoading = userStore.loading
  const navItems = layoutStore.navItems
  const searchButtonActive = layoutStore.location?.pathname === "/search"
  const addButtonActive = ["/edit"].includes(layoutStore.location?.pathname ?? "")

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

  const onDropDownClick = (type: string, item?: DropdownOption) => {
    if (type === "option") {
      if (item?.value === "0") {
        navigate("/edit")
      }
    }
  }

  return (
    <header className="h-14 flex items-center justify-between border-b shadow-sm px-8 sticky top-0 bg-white z-[500]">
      <div className="flex items-center">
        <a href="/" className="flex justify-center w-24 mr-8">
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
                <item.RiIcon className="w-4 mr-2" />
                {item.label}
              </ZButton>
            ))}
          </div>
        </div>
      </div>

      {!userInfoLoading && (
        <div className="flex items-center">
          <div className="mx-6 flex items-center flex-nowrap">
            <ZButton
              variant={"primary_plain"}
              className={classNames(["text-black hover:bg-blue-50 flex-col", { "text-blue-500": searchButtonActive }])}
              onClick={onSearchClick}
            >
              <RiSearchLine size={"1.1rem"} />
            </ZButton>
            <ZDropdown
              options={dropdownOptions}
              classNames={{ menuList: () => classNames(["min-w-20"]) }}
              onClick={onDropDownClick}
              target={
                <div
                  className={twMerge(
                    ZButtonVariants({
                      variant: "primary_plain",
                      className: classNames([
                        "text-black hover:text-blue-600 hover:bg-blue-50 active:text-blue-700",
                        { "text-blue-500": addButtonActive },
                      ]),
                    }),
                  )}
                >
                  <RiAddLine size={"1.1rem"} />
                  <RiArrowDownSFill size={"1.1rem"} />
                </div>
              }
            />
          </div>

          <UserInfo />
        </div>
      )}
    </header>
  )
})

export default Header
