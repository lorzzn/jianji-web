import { FC } from 'react'
import imgLogo from '@/assets/logo.png'
import rootStore from '@/store'
import { observer } from 'mobx-react'

const Sider:FC = () => {
  const menuItems = rootStore.layoutStore.sider.menu.items

  return (
    <div className='flex flex-col py-10 items-center bg-white shadow-sm'>
      <a href="/">
        <img className='h-10 mx-4' src={imgLogo} alt="" />
      </a>

      <div className='flex items-center justify-center py-8 w-full'>
        <div className='flex-col flex w-full justify-center items-center'>
          {
            menuItems.map(item => <a className='py-4 w-full text-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out duration-300' href={item.href} key={item.label}>
              {item.label}
            </a>)
          }
        </div>
      </div>

    </div>
  )
}

export default observer(Sider) 
