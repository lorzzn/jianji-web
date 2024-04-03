import ZInput from "@/components/ZInput/ZInput"
import ZPostEditor from "@/components/ZPost/ZPostEditor"
import { FC } from "react"

const Edit: FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col flex-1 m-6">
        <ZInput scale={"large"} placeholder="请输入标题..." className="mb-2 w-full" />
        <ZPostEditor />
      </div>
    </div>
  )
}

export default Edit
