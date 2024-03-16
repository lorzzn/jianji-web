import { CustomElementProps, LinkReferenceElementType } from "../customTypes"

const LinkReferenceElement = (props: CustomElementProps<LinkReferenceElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default LinkReferenceElement
