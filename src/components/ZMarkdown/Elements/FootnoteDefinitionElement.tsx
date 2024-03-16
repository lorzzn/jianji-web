import { CustomElementProps, FootnoteDefinitionElementType } from "../customTypes"

const FootnoteDefinitionElement = (props: CustomElementProps<FootnoteDefinitionElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default FootnoteDefinitionElement
