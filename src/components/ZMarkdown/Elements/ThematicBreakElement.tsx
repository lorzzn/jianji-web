import { RenderElementProps } from "slate-react"

const ThematicBreakElement = (props: RenderElementProps) => {
  return (
    <div {...props.attributes} className="flex items-center" contentEditable={false}>
      <span className="hidden select-none">{props.children}</span>
      <hr className="flex-1" />
    </div>
  )
}

export default ThematicBreakElement
