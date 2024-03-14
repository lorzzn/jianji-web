import { CustomElementProps, LinkReferenceElementType } from "../custom-types"

const LinkReferenceElement = (props: CustomElementProps<LinkReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default LinkReferenceElement
