import ZImage from "@/components/ZImage/ZImage"
import rootStore from "@/store"
import { observer } from "mobx-react"
import { FC } from "react"

const UserInfo:FC = () => {

  const userInfo = rootStore.userStore.userInfo
  const dialogStore = rootStore.dialogStore

  const onLoginClick = () => {
    dialogStore.show("LoginDialog")
  }

  return 0 ? <a href='/' title={userInfo.username} className='border-t px-4 py-4 hover:bg-gray-100  hover:text-blue-500'>
    <div className='flex justify-center items-center h-full space-x-2'>
      <ZImage src={userInfo.avatar} className='w-8 h-8 rounded-full' />
      <span className='text-sm overflow-hidden overflow-ellipsis'>{userInfo.username}</span>
    </div>
  </a> : <button onClick={onLoginClick} title="登录/注册" className='flex justify-center items-center border-t px-4 py-4 hover:bg-gray-100  hover:text-blue-500'>
    <span>登录/注册</span>
  </button>
}

export default observer(UserInfo)
