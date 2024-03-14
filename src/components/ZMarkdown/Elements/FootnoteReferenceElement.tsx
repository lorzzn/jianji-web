import { CustomElementProps, FootnoteReferenceElementType } from "../custom-types"

const FootnoteReferenceElement = (props: CustomElementProps<FootnoteReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default FootnoteReferenceElement
