import { entries } from "lodash"
import { forwardRef } from "react"
import { Keys } from "react-hotkeys-hook"
import ZModal, { ZModalRef } from "../ZModal/ZModal"
import { hotkeysRecord } from "./ZPostEditor"

interface ZPostEditorHelpDialogProps {
  hotkeys: hotkeysRecord
}

const ZPostEditorHelpDialog = forwardRef<ZModalRef, ZPostEditorHelpDialogProps>((props, ref) => {
  const shortcutRender = (key: string, keys: string | Keys, description: string) => {
    return (
      <div className="flex items-center justify-center space-x-2 my-2" key={key}>
        <div className="bg-gray-200 px-2 rounded text-gray-600">{keys}</div>
        <div>{description}</div>
      </div>
    )
  }

  return (
    <ZModal ref={ref} title={"帮助"}>
      <div className="prose">
        <h3 className="text-center">快捷键</h3>
        {entries(props.hotkeys).map(([key, { keys, description }]) => {
          if (Array.isArray(keys)) {
            return keys.map((item, index) =>
              shortcutRender(item, item, Array.isArray(description) ? description[index] : description),
            )
          }
          return shortcutRender(key, keys, description as string)
        })}
      </div>
    </ZModal>
  )
})

export default ZPostEditorHelpDialog
