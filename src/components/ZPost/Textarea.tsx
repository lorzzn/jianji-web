import { twclx } from "@/utils/twclx"
import { assign } from "lodash"
import { forwardRef, useImperativeHandle, useRef } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizeable?: boolean
}

export interface TextareaRef extends HTMLTextAreaElement {
  getCursorPostion: () => { line: number; column: number }
  getLines: () => string[]
}

const Textarea = forwardRef<TextareaRef, TextareaProps>(({ resizeable, className, ...restProps }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const getCursorPostion = () => {
    const textarea = textareaRef.current
    if (!textarea) return { line: -1, column: -1 }
    const { selectionStart, value } = textarea

    const lines = value.substring(0, selectionStart).split("\n")
    const line = lines.length - 1
    const column = lines[line].length

    return { line, column }
  }

  const getLines = () => {
    const textarea = textareaRef.current
    if (!textarea) return []
    const { value } = textarea
    return value.split("\n")
  }

  useImperativeHandle(ref, () =>
    assign(textareaRef.current, {
      getCursorPostion,
      getLines,
    }),
  )

  return <textarea ref={textareaRef} className={twclx([{ "resize-none": !resizeable }, className])} {...restProps} />
})

export default Textarea
