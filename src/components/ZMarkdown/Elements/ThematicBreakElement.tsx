import { RenderElementProps } from "slate-react"

const ThematicBreakElement = (props: RenderElementProps) => {
  return <hr {...props.attributes} className="my-5" />
}

export default ThematicBreakElement
