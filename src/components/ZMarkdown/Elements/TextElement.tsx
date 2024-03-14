import { CustomElementProps, TextElementType } from "../custom-types"

const TextElement = (props: CustomElementProps<TextElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default TextElement
