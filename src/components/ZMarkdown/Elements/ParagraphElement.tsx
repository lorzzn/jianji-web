import { CustomElementProps, ParagraphElementType } from "../custom-types"

const ParagraphElement = (props: CustomElementProps<ParagraphElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default ParagraphElement
