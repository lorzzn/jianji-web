import { CustomElementProps, LinkElementType } from "../customTypes"

const LinkElement = (props: CustomElementProps<LinkElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default LinkElement
