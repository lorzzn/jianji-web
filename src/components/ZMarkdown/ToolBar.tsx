import { FC } from "react"
import ZSelect, { TreeOptions } from "../ZSelect/ZSelect"

const ToolBar: FC = () => {
  const options: TreeOptions = [
    {
      id: 1,
      name: "Option 1",
    },
    {
      id: 2,
      name: "Option 2",
    },
    {
      id: 3,
      parentId: 1,
      name: "Option 3",
    },
    {
      id: 4,
      parentId: 1,
      name: "Option 4",
    },
    {
      id: 5,
      parentId: 1,
      name: "Option 5",
    },
    {
      id: 6,
      parentId: 2,
      name: "Option 6",
    },
  ]

  return (
    <div className="bg-white mb-2">
      <ZSelect options={options} isTree />
    </div>
  )
}

export default ToolBar
