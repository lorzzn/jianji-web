import ZImage from "@/components/ZImage/ZImage"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import rootStore from "@/store"
import { observer } from "mobx-react"
import { FC } from "react"

const UserInfo:FC = () => {

  const { dialog } = useDialog(dialogNames.LoginDialog)
  const userInfo = rootStore.userStore.userInfo

  const onLoginClick = () => {
    dialog()?.show()
  }

  return <div className="hover:text-blue-500 whitespace-nowrap ml-8">
    {
      userInfo.id ? <a href='/' title={userInfo.name}>
        <div className='flex justify-center items-center h-full space-x-2'>
          <ZImage src={userInfo.avatar} className='w-8 h-8 rounded-full' />
          <span className='text-sm max-w-36 overflow-hidden overflow-ellipsis'>{userInfo.name}</span>
        </div>
      </a> : <button onClick={onLoginClick} title="登录/注册">
        <span>登录/注册</span>
      </button>
    }
  </div>
}

export default observer(UserInfo)
