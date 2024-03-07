import ZImage from "@/components/ZImage/ZImage"
import rootStore from "@/store"
import { observer } from "mobx-react"
import { FC } from "react"
import UserInfo from "./UserInfo"
import { RiAddLine, RiArrowDownSFill, RiSearchLine } from "@remixicon/react"
import ZButton from "@/components/ZButton/ZButton"
import { useNavigate } from "react-router-dom"
import useDialog, { dialogNames } from "@/hooks/useDialog"

const Header:FC = () => {

  const navigate = useNavigate()
  const menuItems = rootStore.layoutStore.nav.items
  const { dialog: searchDialog } = useDialog(dialogNames.SearchDialog)

  const onMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.href) {
      navigate(item.href)
    }
  }

  const onSearchClick = () => {
    searchDialog()?.show()
  }

  return (
    <header className="h-14 flex items-center justify-between border-b shadow-sm px-8 sticky top-0 bg-white">
      <div className='flex items-center'>
        <a href="/" className='flex justify-center w-24 mr-8'>
          <ZImage className='w-full h-full' src="!/logo.png" />
        </a>

        <div className='flex items-center justify-center w-full whitespace-nowrap'>
          <div className='flex space-x-3 w-full justify-center items-center'>
            {
              menuItems.map(item => <ZButton variant={"primary_plain"} className="text-black text-base" key={item.href} onClick={() => onMenuItemClick(item)}>
                <item.RiIcon className='w-4 mr-2' />
                {item.label}
              </ZButton>)
            }
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-6 flex items-center flex-nowrap">
          <ZButton variant={"primary_plain"} className="text-black hover:bg-blue-50 flex-col" onClick={onSearchClick}>
            <RiSearchLine size={"1.1rem"} />
          </ZButton>
          <ZButton variant={"primary_plain"} className="text-black hover:bg-blue-50 flex-col">
            <div className="flex items-center">
              <RiAddLine size={"1.1rem"} />
              <RiArrowDownSFill size={"1.1rem"} />
            </div>
          </ZButton>
        </div>

        <UserInfo />
      </div>
    </header>
  )
}

export default observer(Header)
