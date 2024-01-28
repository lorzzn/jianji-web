import UniImage from "@/components/UniImage/UniImage"
import rootStore from "@/store"
import { observer } from "mobx-react"
import { FC } from "react"

const UserInfo:FC = () => {

  const userInfo = rootStore.userStore.userInfo

  return 0 ? <a href='/' title={userInfo.username} className='w-full border-t px-4 py-4 hover:bg-gray-100  hover:text-blue-500'>
    <div className='flex justify-center items-center h-full space-x-2'>
      <UniImage src={userInfo.avatar} className='w-8 h-8 rounded-full' />
      <span className='text-sm overflow-hidden overflow-ellipsis'>{userInfo.username}</span>
    </div>
  </a> : <a href='/' title="登录/注册" className='flex justify-center items-center w-full border-t px-4 py-4 hover:bg-gray-100  hover:text-blue-500'>
    <span>登录/注册</span>
  </a>
}

export default observer(UserInfo)
