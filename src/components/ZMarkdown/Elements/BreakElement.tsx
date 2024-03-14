import { BreakElementType, CustomElementProps } from "../custom-types"

const BreakElement = (props: CustomElementProps<BreakElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default BreakElement
