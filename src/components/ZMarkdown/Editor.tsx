import { twclx } from "@/utils/twclx"
import { FC } from "react"

interface EditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizeable?: boolean
}

const Editor: FC<EditorProps> = ({ resizeable, className, ...restProps }) => {
  return <textarea className={twclx([{ "resize-none": !resizeable }, className])} {...restProps} />
}

export default Editor
