import classNames from "classnames"
import { FC, useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Preview from "./Preview"
import Textarea from "./Textarea"
import Toolbar, { ToolbarButton } from "./Toolbar"

const ZPostEditor: FC = () => {
  const [value, setValue] = useState<string>("")
  const [layout, setLayout] = useState<string>("normal")
  const [fullscreen, setFullscreen] = useState(false)

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onToolbarClick = (info: ToolbarButton) => {
    if (info.layout) {
      setLayout(info.layout)
    }

    if (info.action === "fullscreen") {
      setFullscreen(!fullscreen)
    }

    if (info.action === "help") {
      console.log("help")
    }
  }

  return (
    <div className={classNames(["flex-1 flex flex-col border bg-gray-100", { "fixed inset-0 z-[500]": fullscreen }])}>
      <Toolbar layout={layout} fullscreen={fullscreen} onClick={onToolbarClick} />
      <div className={"flex-1 flex flex-col"}>
        <PanelGroup
          direction="horizontal"
          className={classNames(["flex-1", { "!flex-row-reverse": layout === "reverse" }])}
        >
          {layout !== "preview" && (
            <Panel minSize={25} id="editor-panel" order={1}>
              <Textarea
                placeholder="请输入markdown内容..."
                value={value}
                onChange={handleValueChange}
                className="w-full h-full p-3"
              />
            </Panel>
          )}
          {!["editor", "preview"].includes(layout) && <PanelResizeHandle className="w-0 border" />}
          {layout !== "editor" && (
            <Panel minSize={25} id="preview-panel" order={2}>
              <div className="w-full h-full bg-white p-3">
                <Preview>{value}</Preview>
              </div>
            </Panel>
          )}
        </PanelGroup>
      </div>
    </div>
  )
}

export default ZPostEditor
