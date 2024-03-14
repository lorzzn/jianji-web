import { CustomElementProps, RootElementType } from "../custom-types"

const RootElement = (props: CustomElementProps<RootElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default RootElement
