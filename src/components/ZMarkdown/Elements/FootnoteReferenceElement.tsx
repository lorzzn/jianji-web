import { CustomElementProps, FootnoteReferenceElementType } from "../customTypes"

const FootnoteReferenceElement = (props: CustomElementProps<FootnoteReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default FootnoteReferenceElement
