import { twclx } from "@/utils/twclx"
import { FC } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizeable?: boolean
}

const Textarea: FC<TextareaProps> = ({ resizeable, className, ...restProps }) => {
  return <textarea className={twclx([{ "resize-none": !resizeable }, className])} {...restProps} />
}

export default Textarea
