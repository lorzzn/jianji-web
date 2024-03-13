import { FC } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react'
import ZImage from '@/components/ZImage/ZImage'
import UserInfo from './UserInfo'

const Sider:FC = () => {
  const { layoutStore } = useStore()
  const menuItems = layoutStore.navItems

  return (
    <div className='flex flex-col pt-10 w-52 items-center justify-between bg-white shadow-sm'>
      <div className='w-full'>
        <a href="/" className='flex justify-center'>
          <ZImage className='h-10 mx-4 w-24' src="!/logo.png" />
        </a>

        <div className='flex items-center justify-center py-8 w-full'>
          <div className='flex-col flex w-full justify-center items-center'>
            {
              menuItems.map(item => <a className='flex items-center justify-center py-4 w-full hover:bg-gray-100 hover:text-blue-500 transition ease-in-out duration-300' href={item.href} key={item.label}>
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

export default observer(Sider) 
