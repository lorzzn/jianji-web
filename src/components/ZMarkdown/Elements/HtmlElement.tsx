import { CustomElementProps, HtmlElementType } from "../customTypes"

const HtmlElement = (props: CustomElementProps<HtmlElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default HtmlElement
