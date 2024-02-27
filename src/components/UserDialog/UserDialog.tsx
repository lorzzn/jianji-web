import useDialog, { dialogNames } from "@/hooks/useDialog";
import { FC, ReactNode, useState } from "react";
import ZModal from "../ZModal/ZModal";
import classNames from "classnames";
import SettingsPage from "../SettingsPage/SettingsPage";
import { INavItem } from "../SettingsPage/NavItem";
import ZImage from "../ZImage/ZImage";
import rootStore from "@/store";
import { observer } from "mobx-react";
import { dateFormat } from "@/utils/dateFormat";
import ZButton from "../ZButton/ZButton";
import { RiArrowLeftSLine } from "@remixicon/react";
import ZInput from "../ZInput/ZInput";
import Yup from "@/utils/yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ZForm from "../ZForm/ZForm";

interface UserInfoItemProps {
  label: ReactNode
  content: ReactNode
  border?: boolean
}

interface IEditUserInfo {
  name: string
}

const yupSchema = Yup.object().shape({
  name: Yup.string().required('请您输入用户名'),
})

const UserInfoItem:FC<UserInfoItemProps> = ({ label, content, border }) => {

  return <div className={classNames(["flex items-center leading-10 text-gray-800", { "border-b pb-1 mb-1 border-gray-300": border }])}>
    <div className="ml-3 w-24 shrink-0">{label}</div>
    <div>{content}</div>
  </div>
}

const UserDialog:FC = () => {

  const { register: dialogRegister } = useDialog(dialogNames.UserDialog)
  const userInfo = rootStore.userStore.userInfo
  const [ isEdit, setIsEdit ] = useState<boolean>(false)

  const newUserInfo: IEditUserInfo = {
    name: userInfo.name
  }
  
  const { handleSubmit, register, formState: { errors } } = useForm<IEditUserInfo>({
    defaultValues: newUserInfo,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  })

  const settingsPageNav: INavItem[] = [
    {
      value: 0,
      label: "我的资料",
    },
    {
      value: 1,
      label: "个人统计",
    }
  ]

  const onSettingsNavItemClick = (item: INavItem) => {
    console.log(item)
  }

  const onEditUserInfoClick = () => {
    setIsEdit(!isEdit)

  }

  const cancelEditUserInfo = () => {
    setIsEdit(false)
  }

  const submitNewUserInfo = (formData: IEditUserInfo) => {
    console.log(formData)
    
  }

  const settingsPageContentRender = (item: INavItem|undefined) => {

    return <div className="flex flex-col justify-between h-full overflow-hidden ml-3">
      {
        item?.value === 0 && !isEdit && <div className="flex flex-col items-center w-full">
          <ZImage 
            src={userInfo.avatar+"&s=192"}
            className="w-24 h-24 rounded-full"
          />

          <div className="mt-6 mb-6">
            {userInfo.name}
          </div>

          <div className="w-full bg-gray-100 px-2 py-2 rounded-lg">
            <UserInfoItem label={"用户ID"} content={userInfo.id} border />
            <UserInfoItem label={"邮箱"} content={userInfo.email} border />
            <UserInfoItem label={"创建时间"} content={dateFormat(userInfo.createdAt)} />
          </div>
        </div>
      }

      {
        item?.value === 0 && isEdit && <div className="w-full h-full bg-white">
            <button className="flex items-center text-blue-500 hover:text-blue-600" onClick={cancelEditUserInfo}>
            <RiArrowLeftSLine />
            <span>取消</span>
          </button>

          <div className="px-6 mt-3">
            <div className="text-lg">头像</div>
            <div className="text-sm mt-3 mb-3">
              <span>前往</span>
              <a className="text-blue-500" href="https://cravatar.com/" target="_blank" rel="noopener noreferrer"> Cravatar 初认头像 </a>
              <span>修改</span>
            </div>
            <div className="text-lg">用户名</div>
            <ZForm 
              className="flex flex-col h-full justify-between"
            >
              <div>
                <ZInput scale={"large"} className="mt-3 w-full" placeholder="请输入用户名" {...register("name")} />
              </div>
              <div className="text-sm mt-1 text-red-500">{errors.name?.message}</div>
            </ZForm>
          </div>
        </div>
      }

      {
        item?.value === 0 && <div className="flex items-center justify-center">
          <ZButton scale={"large"} className="w-48" onClick={isEdit ? handleSubmit(submitNewUserInfo):onEditUserInfoClick}>{isEdit ? "保存":"编辑资料"}</ZButton>
        </div>
      }

      {
        item?.value === 1 && <div>
          功能开发中...
        </div>
      }
    </div>
  }

  return <ZModal
    ref={dialogRegister}
    title={"我"}
    titleAlignCenter
    classNames={{
      modal: classNames(['rounded-lg w-11/12 h-[36rem]'])
    }}
  >
    <SettingsPage
      nav={settingsPageNav}
      defaultNavIndex={0}
      onClick={onSettingsNavItemClick}
      contentRender={settingsPageContentRender}
    />
  </ZModal>
}

export default observer(UserDialog)
