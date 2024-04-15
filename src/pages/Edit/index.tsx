import ZButton from "@/components/ZButton/ZButton"
import ZInput, { ZInputProps } from "@/components/ZInput/ZInput"
import ZPostEditor from "@/components/ZPost/ZPostEditor"
import useDialog, { dialogNames } from "@/hooks/useDialog"
import { useStore } from "@/store"
import { uuidjs } from "@/utils/uuid"
import { observer } from "mobx-react"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"

const Edit: FC = observer(() => {
  const { postStore } = useStore()
  const { title, setTitle, getFromRemote } = postStore

  const { dialog } = useDialog(dialogNames.SavePostDialog)
  const showSaveDialog = () => dialog()?.show()

  const { uuid: uuidparam } = useParams()

  useEffect(() => {
    let uuid = uuidjs.NIL
    if (uuidparam && uuidjs.validate(uuidparam)) {
      uuid = uuidparam
    }
    getFromRemote(uuid)
  }, [uuidparam])

  const onTitleChange: ZInputProps["onChange"] = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col flex-1 m-6">
        <div className="flex justify-between items-center mb-2">
          <ZInput
            scale={"large"}
            placeholder="标题..."
            className="flex-1 mr-3"
            value={title}
            onChange={onTitleChange}
          />
          <ZButton scale={"large"} className="px-8" onClick={showSaveDialog}>
            保存
          </ZButton>
        </div>
        <ZPostEditor />
      </div>
    </div>
  )
})

export default Edit
