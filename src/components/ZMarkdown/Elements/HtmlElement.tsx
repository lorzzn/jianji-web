import { CustomElementProps, HtmlElementType } from "../custom-types"

const HtmlElement = (props: CustomElementProps<HtmlElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default HtmlElement
