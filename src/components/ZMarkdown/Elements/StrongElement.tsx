import { CustomElementProps, StrongElementType } from "../customTypes"

const StrongElement = (props: CustomElementProps<StrongElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default StrongElement
