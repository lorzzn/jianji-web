import { FC, useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Preview from "./Preview"
import Textarea from "./Textarea"

const ZPostEditor: FC = () => {
  const [value, setValue] = useState<string>("")

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div>sasasas</div>
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel minSize={25} order={1} className="shadow-sm rounded-md">
          <Textarea
            placeholder="请输入markdown内容..."
            value={value}
            onChange={handleValueChange}
            className="w-full h-full p-3"
          />
        </Panel>
        <PanelResizeHandle className="w-2 flex justify-center items-center active:bg-black hover:bg-black transition rounded-sm">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </PanelResizeHandle>
        <Panel minSize={25} order={2} className="shadow-sm rounded-md">
          <div className="w-full h-full bg-white p-3">
            <Preview>{value}</Preview>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default ZPostEditor
