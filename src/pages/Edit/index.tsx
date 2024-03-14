import ZMarkdown from "@/components/ZMarkdown/ZMarkdown"
import { FC } from "react"

const Edit: FC = () => {
  return (
    <div>
      新建文章
      <ZMarkdown className="w-96 h-96 ml-6" />
    </div>
  )
}

export default Edit
