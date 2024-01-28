import { FC } from 'react'
import imgLogo from '@/assets/logo.png'

const siderMenus = [
  { href: "/", label: "首页" },
  { href: "/", label: "归档" },
  { href: "/", label: "分类" },
  { href: "/", label: "标签" },
  { href: "/", label: "相册" },
  { href: "/", label: "友链" },
  { href: "/", label: "关于" },
]

const Sider:FC = () => {

  return (
    <div className='flex flex-col py-10 items-center bg-white shadow-sm'>
      <a href="/">
        <img className='w-24 mx-4' src={imgLogo} alt="" />
      </a>

      <div className='flex items-center justify-center py-8 w-full'>
        <div className='flex-col flex w-full justify-center items-center'>
          {
            siderMenus.map(item => <a className='py-4 w-full text-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out duration-300' href={item.href} key={item.label}>
              {item.label}
            </a>)
          }
        </div>
      </div>

    </div>
  )
}

export default Sider 
