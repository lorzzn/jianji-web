import ZButton from "@/components/ZButton/ZButton"
import ZInput from "@/components/ZInput/ZInput"
import ZPostEditor from "@/components/ZPost/ZPostEditor"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import { FC } from "react"

const Edit: FC = () => {
  const { dialog } = useDialog(dialogNames.SavePostDialog)

  const showSaveDialog = () => dialog()?.show()
  // const hideSaveDialog = () => dialog()?.hide()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col flex-1 m-6">
        <div className="flex justify-between items-center mb-2">
          <ZInput scale={"large"} placeholder="标题..." className="flex-1 mr-3" />
          <ZButton scale={"large"} className="px-8" onClick={showSaveDialog}>
            保存
          </ZButton>
        </div>
        <ZPostEditor />
      </div>
    </div>
  )
}

export default Edit
