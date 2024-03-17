import classNames from "classnames"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface EditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizeable?: boolean
}

const Editor: FC<EditorProps> = ({ resizeable, className, ...restProps }) => {
  return <textarea className={twMerge(classNames([{ "resize-none": !resizeable }, className]))} {...restProps} />
}

export default Editor
