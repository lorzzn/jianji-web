import { CustomElementProps, InlineCodeElementType } from "../custom-types"

const InlineCodeElement = (props: CustomElementProps<InlineCodeElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default InlineCodeElement
