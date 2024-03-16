import { CustomElementProps, ParagraphElementType } from "../customTypes"

const ParagraphElement = (props: CustomElementProps<ParagraphElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default ParagraphElement
