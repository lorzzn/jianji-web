import { CustomElementProps, StrongElementType } from "../custom-types"

const StrongElement = (props: CustomElementProps<StrongElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default StrongElement
