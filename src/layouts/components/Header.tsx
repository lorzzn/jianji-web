import ZImage from "@/components/ZImage/ZImage"
import rootStore from "@/store"
import { observer } from "mobx-react"
import { FC } from "react"
import UserInfo from "./UserInfo"

const Header:FC = () => {

  const menuItems = rootStore.layoutStore.nav.items
  return (
    <div className="h-14 flex items-center justify-between border-b shadow-sm px-8">
      <div className='flex items-center'>
        <a href="/" className='flex justify-center w-24 mr-8'>
          <ZImage className='w-full h-full' src="!/logo.png" />
        </a>

        <div className='flex items-center justify-center w-full whitespace-nowrap'>
          <div className='flex space-x-6 w-full justify-center items-center'>
            {
              menuItems.map(item => <a className='flex items-center justify-center w-full hover:text-blue-500 transition ease-in-out duration-300' href={item.href} key={item.label}>
                <item.RiIcon className='w-4 mr-2' />
                {item.label}
              </a>)
            }
          </div>
        </div>
      </div>

      <UserInfo />
    </div>
  )
}

export default observer(Header)
