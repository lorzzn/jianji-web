import { CustomElementProps, LinkElementType } from "../custom-types"

const LinkElement = (props: CustomElementProps<LinkElementType>) => {
  return <div {...props.attributes}>{props.children}</div>
}

export default LinkElement
