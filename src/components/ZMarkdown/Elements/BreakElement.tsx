import { BreakElementType, CustomElementProps } from "../customTypes"

const BreakElement = (props: CustomElementProps<BreakElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default BreakElement
