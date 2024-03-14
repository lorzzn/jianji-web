import { CustomElementProps, FootnoteDefinitionElementType } from "../custom-types"

const FootnoteDefinitionElement = (props: CustomElementProps<FootnoteDefinitionElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default FootnoteDefinitionElement
