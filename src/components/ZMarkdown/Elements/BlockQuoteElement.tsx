import { BlockquoteElementType, CustomElementProps } from "../custom-types"

const BlockQuoteElement = (props: CustomElementProps<BlockquoteElementType>) => {
  return (
    <blockquote {...props.attributes} className="border-l-4 border-black pl-4">
      {props.children}
    </blockquote>
  )
}

export default BlockQuoteElement
