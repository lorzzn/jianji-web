import { CustomElementProps, TextElementType } from "../customTypes"

const TextElement = (props: CustomElementProps<TextElementType>) => {
  return <span {...props.attributes}>{props.children}</span>
}

export default TextElement
